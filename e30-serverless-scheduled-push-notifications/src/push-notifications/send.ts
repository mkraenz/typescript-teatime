import { Handler } from "aws-lambda";
import AWS from "aws-sdk";
import { ServiceConfigurationOptions } from "aws-sdk/lib/service";
import { IsInt, Max, Min, validate } from "class-validator";
import Expo from "expo-server-sdk";
import { InvalidArgument } from "../util/custom.error";
import { respond } from "../utils/respond";
import { assertEnvVar } from "../validation/assert";
import { AwesomeMessagesService } from "./AwesomeMessagesService";
import { ExpoSendAdapter } from "./ExpoSendAdapter";
import { Sender } from "./Sender";
import { SubscriptionRepository } from "./SubscriptionRepository";
import { TicketRepository } from "./TicketRepository";

type IsoDateString = string;
type ARN = string;
interface EventBridgeScheduledEvent {
    version: "0";
    id: string;
    "detail-type": "Scheduled Event";
    source: "aws.events";
    account: string;
    time: IsoDateString; // iso date '2021-08-26T10:32:05Z'
    region: string;
    resources: ARN[];
    detail: {};
}

interface IBody {
    time: string; // ISO-8601 date string (e.g. "2020-01-01T00:00:00.000Z")
}

export class Body implements IBody {
    constructor(param: IBody) {
        this.hour = new Date(param.time).getUTCHours();
        this.minute = new Date(param.time).getUTCMinutes();
    }

    @IsInt()
    @Min(0)
    @Max(23)
    hour: number;

    @IsInt()
    @Min(0)
    @Max(59)
    minute: number;

    /** @returns in format HH:mm */
    get time(): string {
        const date = new Date();
        date.setHours(this.hour, this.minute);
        return date.toTimeString().slice(0, 5);
    }

    public async validate() {
        const errors = await validate(this);
        if (errors.length > 0) {
            throw new InvalidArgument(JSON.stringify(errors));
        }
    }
}

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
assertEnvVar(process.env.AWESOME_MESSAGES_URI, "AWESOME_MESSAGES_URI");
const awesomeMessagesUri = process.env.AWESOME_MESSAGES_URI;

const subscriptions = new SubscriptionRepository(
    docClient,
    subsTable,
    subsByTimeIndex
);
const expo = new Expo();
const expoAdapter = new ExpoSendAdapter(expo);
const awesomeMessages = new AwesomeMessagesService(awesomeMessagesUri);
const tickets = new TicketRepository(docClient, ticketTable);
const sender = new Sender(subscriptions, expoAdapter, awesomeMessages, tickets);

export const handler: Handler<Pick<EventBridgeScheduledEvent, "time">> =
    async event => {
        try {
            const body = new Body(event);
            await body.validate();
            await sender.send(body.time);
            return respond(200, { success: true });
        } catch (error) {
            return respond(500, error);
        }
    };
