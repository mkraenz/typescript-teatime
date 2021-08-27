import Expo, { ExpoPushMessage } from "expo-server-sdk";
import { v4 } from "uuid";
import { Subscription } from "./SubscriptionRepository";
import { Ticket } from "./TicketRepository";

export class ExpoSendAdapter {
    constructor(
        private readonly expo: Pick<
            Expo,
            "chunkPushNotifications" | "sendPushNotificationsAsync"
        >
    ) {}

    public subsToMessages(
        subs: Subscription[],
        message: {
            text: string;
            authorAndCountry: string;
        }
    ) {
        return subs.map(s => ({
            to: s.expoPushToken,
            sound: "default" as const,
            title: message.text,
            body: message.authorAndCountry,
        }));
    }

    public chunkNotifications = this.expo.chunkPushNotifications.bind(
        this.expo
    );

    /** IMPORTANT: Only use with message chunks. */
    public async sendNotifications(
        messageChunk: ExpoPushMessage[]
    ): Promise<Ticket[]> {
        const rawTickets = await this.expo.sendPushNotificationsAsync(
            messageChunk
        );
        const timestamp = new Date().toISOString();
        const tickets: Ticket[] = rawTickets.map((ticket, i) => {
            const notification = messageChunk[i];
            if (ticket.status === "ok") {
                return {
                    type: "SuccessTicket",
                    expoPushToken: notification.to as string,
                    uuid: v4(),
                    timestamp: timestamp,
                    receiptId: ticket.id,
                };
            }
            return {
                type: "ErrorTicket",
                expoPushToken: notification.to as string,
                uuid: v4(),
                timestamp: timestamp,
                ...ticket,
            };
        });
        return tickets;
    }
}
