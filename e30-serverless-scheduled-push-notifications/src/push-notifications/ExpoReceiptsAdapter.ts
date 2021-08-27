import Expo, { ExpoPushErrorReceipt } from "expo-server-sdk";
import { chunk } from "lodash";
import { MAX_DYNAMO_DB_BATCH_SIZE, SuccessTicket } from "./TicketRepository";

export interface SuccessReceipt {
    type: "SuccessReceipt";
    ticketUuid: string;
    receiptId: string;
}
export interface ErrorReceipt extends ExpoPushErrorReceipt {
    type: "ErrorReceipt";
    ticketUuid: string;
    receiptId: string;
    expoPushToken: string;
}

export class ExpoReceiptAdapter {
    constructor(
        private readonly expo: Pick<
            Expo,
            | "chunkPushNotificationReceiptIds"
            | "getPushNotificationReceiptsAsync"
        >
    ) {}

    public chunkSuccessTickets(tickets: SuccessTicket[]) {
        const receiptIds = tickets.map(ticket => ticket.receiptId);
        const chunkedReceiptIds =
            this.expo.chunkPushNotificationReceiptIds(receiptIds);

        const commonPartition = Math.min(
            chunkedReceiptIds[0].length,
            MAX_DYNAMO_DB_BATCH_SIZE
        );
        return chunk(tickets, commonPartition);
    }

    /** IMPORTANT: chunk tickets before using this */
    async getReceipts(ticketChunk: SuccessTicket[]): Promise<{
        successReceipts: SuccessReceipt[];
        errorReceipts: ErrorReceipt[];
    }> {
        const receiptIds = ticketChunk.map(ticket => ticket.receiptId);
        const rawReceipts = await this.expo.getPushNotificationReceiptsAsync(
            receiptIds
        );
        const successReceipts: SuccessReceipt[] = [];
        const errorReceipts: ErrorReceipt[] = [];

        for (const ticket of ticketChunk) {
            const receipt = rawReceipts[ticket.receiptId];
            if (!receipt) {
                console.error(
                    `Receipt not found for ticket: ${ticket.uuid}, receiptId: ${ticket.receiptId}. This can only happen if expo did not return a requested existing receipt, which is unexpected.`
                );
                continue;
            }
            if (receipt.status === "ok") {
                successReceipts.push({
                    type: "SuccessReceipt",
                    ticketUuid: ticket.uuid,
                    receiptId: ticket.receiptId,
                });
            } else {
                errorReceipts.push({
                    type: "ErrorReceipt",
                    ticketUuid: ticket.uuid,
                    receiptId: ticket.receiptId,
                    expoPushToken: ticket.expoPushToken,
                    ...receipt,
                });
            }
        }
        return { successReceipts, errorReceipts };
    }
}
