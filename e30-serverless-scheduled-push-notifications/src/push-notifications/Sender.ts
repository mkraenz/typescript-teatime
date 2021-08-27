import { AwesomeMessagesService } from "./AwesomeMessagesService";
import { ExpoSendAdapter } from "./ExpoSendAdapter";
import { SubscriptionRepository } from "./SubscriptionRepository";
import { TicketRepository } from "./TicketRepository";
export class Sender {
    constructor(
        private readonly subscriptions: Pick<
            SubscriptionRepository,
            "getAllByTime"
        >,
        private readonly expo: Pick<
            ExpoSendAdapter,
            "chunkNotifications" | "sendNotifications" | "subsToMessages"
        >,
        private readonly awesomeMessages: Pick<
            AwesomeMessagesService,
            "getTodaysMessage"
        >,
        private readonly ticketRepository: Pick<TicketRepository, "putMany">
    ) {}

    public async send(time: string) {
        const subs = await this.subscriptions.getAllByTime(time);
        if (subs.length === 0) {
            console.log(
                "No subscriptions found for time ${time}. Skipping sending notifications."
            );
            return;
        }
        console.log(`found ${subs.length} subs for ${time}`);
        const message = await this.awesomeMessages.getTodaysMessage();
        const notifications = this.expo.subsToMessages(subs, message);
        const notificationChunks = this.expo.chunkNotifications(notifications);
        for (const [i, notificationChunk] of notificationChunks.entries()) {
            console.log(
                `sending notification chunk ${i + 1}/${
                    notificationChunks.length
                } of length ${notificationChunk.length}, total notifications: ${
                    notifications.length
                }`
            );
            const tickets = await this.expo.sendNotifications(
                notificationChunk
            );
            console.log(`successfully sent notification chunk ${i}`);
            await this.ticketRepository.putMany(tickets);
            console.log(
                "successfully saved tickets",
                tickets.map(t => `${t.type} ${t.uuid}`).join(", ")
            );
        }
        console.log(`successfully processed ${subs.length} subs for ${time}`);
    }
}
