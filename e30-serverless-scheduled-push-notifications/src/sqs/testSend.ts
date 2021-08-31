import { Handler } from "aws-lambda";
import AWS from "aws-sdk";
import { assertEnvVar } from "../validation/assert";

const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

const ticketDeletionQueueUrl = process.env.TICKET_DELETION_QUEUE_URL;
assertEnvVar(ticketDeletionQueueUrl, "TICKET_DELETION_QUEUE_URL");

const ticketsForDeletion = {
    push: async (ticketUuids: string[]) =>
        sqs
            .sendMessageBatch({
                QueueUrl: ticketDeletionQueueUrl,
                Entries: ticketUuids.map(id => ({
                    Id: id,
                    MessageBody: JSON.stringify({ ticketUuid: id }),
                })),
            })
            .promise(),
};
export const handler: Handler = async (event, context) => {
    const res = await ticketsForDeletion.push([
        "my-super-duper-id1",
        "FiniteSingularity",
        "minasys",
        "freaky",
    ]);
    return {
        body: JSON.stringify(res.Successful),
        statusCode: 200,
    };
};
