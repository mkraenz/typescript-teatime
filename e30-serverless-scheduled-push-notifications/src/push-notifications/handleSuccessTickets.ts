import { Handler } from "aws-lambda";
import AWS from "aws-sdk";
import { ServiceConfigurationOptions } from "aws-sdk/lib/service";
import Expo from "expo-server-sdk";
import { partition } from "lodash";
import { respond } from "../utils/respond";
import { assertEnvVar } from "../validation/assert";
import {
    ErrorReceipt,
    ExpoReceiptAdapter,
    SuccessReceipt,
} from "./ExpoReceiptsAdapter";
import { SubscriptionRepository } from "./SubscriptionRepository";
import { TicketRepository } from "./TicketRepository";

assertEnvVar(process.env.REGION, "REGION");
const serviceConfigOptions: ServiceConfigurationOptions = {
    region: process.env.REGION,
    endpoint: process.env.IS_OFFLINE ? "http://localhost:7999" : undefined,
};

const docClient = new AWS.DynamoDB.DocumentClient(serviceConfigOptions);

assertEnvVar(process.env.SUBSCRIPTION_TABLE, "SUBSCRIPTION_TABLE");
const subsTable = process.env.SUBSCRIPTION_TABLE;
assertEnvVar(process.env.TICKET_TABLE, "TICKET_TABLE");
const ticketTable = process.env.TICKET_TABLE;
assertEnvVar(
    process.env.SUBSCRIPTIONS_BY_TIME_INDEX,
    "SUBSCRIPTIONS_BY_TIME_INDEX"
);
const subsByTimeIndex = process.env.SUBSCRIPTIONS_BY_TIME_INDEX;

const thirtyMins = 30 * 60 * 1000;

const subs = new SubscriptionRepository(docClient, subsTable, subsByTimeIndex);
const expo = new Expo();
const expoReceipts = new ExpoReceiptAdapter(expo);
const tickets = new TicketRepository(docClient, ticketTable);
console.log("handler-independent setup completed");

const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
const ticketDeletionQueueUrl = process.env.TICKET_DELETION_QUEUE_URL;
assertEnvVar(ticketDeletionQueueUrl, "TICKET_DELETION_QUEUE_URL");
const ticketsForDeletion = {
    push: async (ticketUuids: string[]) => {
        await sqs
            .sendMessageBatch({
                QueueUrl: ticketDeletionQueueUrl,
                Entries: ticketUuids.map(id => ({
                    Id: id,
                    MessageBody: JSON.stringify({ ticketUuid: id }),
                })),
            })
            .promise();
    },
};

export const handler: Handler = async () => {
    try {
        // ✔  get all success tickets from the database
        // ✔ if no success tickets found: do nothing
        //              tickets contain a receiptId, expoPushToken
        // ✔  if success ticket is younger than 30 mins, do nothing
        // ✔  avoid chunking with 2 different sizes
        // ✔  get receipts from expo
        //              receipts have 2 states: ok, error
        // ✔  if ok, delete ticket from database
        // ✔ if error:
        // ✔ if error is "DeviceNotRegistered" then unsubscribe user by expoPushToken
        // ✔ otherwise: console.error

        const allSuccessTickets = await tickets.getSuccessTickets();
        const thirtyMinsAgo = new Date(Date.now() - thirtyMins).toISOString();
        const successTickets = allSuccessTickets.filter(
            t => t.timestamp < thirtyMinsAgo
        );
        if (successTickets.length === 0) {
            console.log(
                `No success tickets after ${thirtyMinsAgo} found. Skipping`
            );
            return respond(200, { success: true, ticketsProcessed: 0 });
        }
        const chunkedTickets = expoReceipts.chunkSuccessTickets(successTickets);
        for (const [i, ticketChunk] of chunkedTickets.entries()) {
            console.log(
                `Processing chunk ${i + 1} of ${chunkedTickets.length}`
            );
            const {
                successReceipts,
                errorReceipts,
            }: {
                successReceipts: SuccessReceipt[];
                errorReceipts: ErrorReceipt[];
            } = await expoReceipts.getReceipts(ticketChunk);
            console.log(
                `chunk: ${i + 1}, successReceipts: ${
                    successReceipts.length
                }, errorReceipts: ${errorReceipts.length}`
            );
            await ticketsForDeletion.push(
                successReceipts.map(r => r.ticketUuid)
            );
            console.log(`deleted ${successTickets.length} success receipts`);
            const [deviceNotRegisteredReceipts, otherErrors] = partition(
                errorReceipts,
                e => e.details?.error === "DeviceNotRegistered"
            );
            await logOtherErrors(otherErrors);
            if (deviceNotRegisteredReceipts.length > 0) {
                await handleDeviceNotRegisteredError(
                    deviceNotRegisteredReceipts
                );
            }
        }
        console.log(
            `successfully handled ${successTickets.length} success tickets`
        );

        return respond(200, { success: true });
    } catch (error) {
        return respond(500, error);
    }
};

// TODO handle other errors properly
const logOtherErrors = async (receipts: ErrorReceipt[]) => {
    for (const receipt of receipts) {
        console.error(
            `Receipt ${receipt.receiptId} for ticket ${receipt.ticketUuid} has error ${receipt.details?.error}`
        );
    }
};

/** TODO change architecture to not directly remove subscriptions from the database. E.g. SQS triggering unsubscribe lambda function */
async function handleDeviceNotRegisteredError(
    deviceNotRegisteredReceipts: ErrorReceipt[]
) {
    await subs.removeMany(
        deviceNotRegisteredReceipts.map(r => r.expoPushToken)
    );
    await tickets.deleteManySuccessTickets(
        deviceNotRegisteredReceipts.map(r => r.ticketUuid)
    );
}
