import axios from "axios";
import { random } from "lodash";

export interface AwesomeMessage {
    id: string;
    isodate: string;
    text: string;
    author: string;
    country: string;
}

export class AwesomeMessagesService {
    constructor(private readonly messageS3Uri: string) {}

    private cachedMessages: AwesomeMessage[] = [];

    public async getTodaysMessage(): Promise<{
        text: string;
        authorAndCountry: string; // e.g. Phil from United States
    }> {
        if (this.cachedMessages.length === 0) {
            await this.fetchMessages();
        }

        const message = this.pickTodaysMessage(this.cachedMessages);
        if (!message) {
            await this.fetchMessages();
            const message = this.pickTodaysMessage(this.cachedMessages);
            if (!message) {
                const randomMessage =
                    this.cachedMessages[random(this.cachedMessages.length - 1)];
                return this.formatMessage(randomMessage);
            }
            return this.formatMessage(message);
        }
        return this.formatMessage(message);
    }

    private formatMessage(message: AwesomeMessage) {
        return {
            text: message.text,
            authorAndCountry: `${message.author} from ${message.country}`,
        };
    }

    private async fetchMessages() {
        const { data: messages } = await axios.get<AwesomeMessage[]>(
            this.messageS3Uri
        );
        // TODO assert messages not empty + isAwesomeMessage, else filter
        this.cachedMessages = messages;
    }

    private pickTodaysMessage(
        messages: AwesomeMessage[]
    ): AwesomeMessage | undefined {
        const today = new Date();
        const todayString = `${today.getUTCFullYear()}-${
            today.getUTCMonth() + 1
        }-${today.getUTCDate()}`;
        const message = messages.find(m => m.isodate.includes(todayString));
        return message;
    }
}
