import { ExpoPushErrorTicket } from "expo-server-sdk";
import { chunk } from "lodash";

export interface SuccessTicket {
    type: "SuccessTicket";
    expoPushToken: string;
    uuid: string;
    timestamp: string;
    receiptId: string;
}

export interface ErrorTicket extends ExpoPushErrorTicket {
    type: "ErrorTicket";
    expoPushToken: string;
    uuid: string;
    timestamp: string;
    __debug?: never;
}

export type Ticket = SuccessTicket | ErrorTicket;

export const MAX_DYNAMO_DB_BATCH_SIZE = 25;

export class TicketRepository {
    constructor(
        private readonly dynamoDb: AWS.DynamoDB.DocumentClient,
        private readonly tableName: string
    ) {}

    async putMany(tickets: Ticket[]) {
        const chunks = chunk(tickets, MAX_DYNAMO_DB_BATCH_SIZE);
        for (const ticketChunk of chunks) {
            await this.dynamoDb
                .batchWrite({
                    RequestItems: {
                        [this.tableName]: ticketChunk.map(ticket => ({
                            PutRequest: {
                                Item: ticket,
                            },
                        })),
                    },
                })
                .promise();
        }
    }

    async getSuccessTickets() {
        const tickets = await this.dynamoDb
            .query({
                TableName: this.tableName,
                KeyConditionExpression: "#type = :type",
                ExpressionAttributeValues: {
                    ":type": "SuccessTicket",
                },
                ExpressionAttributeNames: {
                    "#type": "type",
                },
            })
            .promise();
        return tickets.Items as SuccessTicket[];
    }

    async deleteManySuccessTickets(uuids: string[]) {
        if (uuids.length === 0) {
            console.log("No tickets to delete");
            return;
        }
        if (uuids.length > MAX_DYNAMO_DB_BATCH_SIZE) {
            throw new Error(
                `Too many success tickets to delete. uuids: ${uuids.join(", ")}`
            );
        }
        console.log("start removing tickets by uuids", uuids);
        await this.dynamoDb
            .batchWrite({
                RequestItems: {
                    [this.tableName]: uuids.map(uuid => ({
                        DeleteRequest: {
                            Key: {
                                type: "SuccessTicket",
                                uuid,
                            },
                        },
                    })),
                },
            })
            .promise();
        console.log("removed tickets by uuids", uuids);
    }
}
