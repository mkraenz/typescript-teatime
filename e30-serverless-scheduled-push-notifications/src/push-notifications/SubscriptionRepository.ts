import AWS from "aws-sdk";
import { MAX_DYNAMO_DB_BATCH_SIZE } from "./TicketRepository";

export interface Subscription {
    expoPushToken: string;
    /** Format HH:mm, e.g. 23:45, 01:08 */
    time: string;
}

export class SubscriptionRepository {
    constructor(
        private readonly docClient: AWS.DynamoDB.DocumentClient,
        private readonly table: string,
        private readonly byTimeIndex: string
    ) {}

    async getAllByTime(time: string) {
        const subsRes = await this.docClient
            .query({
                TableName: this.table,
                IndexName: this.byTimeIndex,
                KeyConditionExpression: "#time = :time",
                ExpressionAttributeValues: {
                    ":time": time,
                },
                ExpressionAttributeNames: {
                    "#time": "time",
                },
            })
            .promise();
        if (!subsRes.Items) {
            throw new Error("No subscriptions found");
        }
        return subsRes.Items as Subscription[];
    }
    async get() {}

    async put() {}

    async removeMany(tokens: string[]) {
        if (tokens.length > MAX_DYNAMO_DB_BATCH_SIZE) {
            throw new Error(
                `Too many tokens to delete. Tokens ${tokens.join(", ")}`
            );
        }
        console.log("start removing subs by expoIds", tokens);
        await this.docClient
            .batchWrite({
                RequestItems: {
                    [this.table]: tokens.map(token => ({
                        DeleteRequest: {
                            Key: {
                                expoPushToken: token,
                            },
                        },
                    })),
                },
            })
            .promise();
        console.log("successfully removed subs by expoIds", tokens);
    }
}
