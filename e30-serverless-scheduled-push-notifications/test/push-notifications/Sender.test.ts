import { Sender } from "../../src/push-notifications/Sender";

it("sends notifications and saves tickets to Tickets table", async () => {
    type SenderParams = ConstructorParameters<typeof Sender>;
    const subsRepo: SenderParams[0] = {
        getAllByTime: jest.fn(async (time: string) => {
            if (time === "17:28") {
                return [
                    {
                        expoPushToken: "ExponentPushToken[384]",
                        time,
                    },
                ];
            }
            fail("called with wrong time");
        }),
    };
    const expoMock: SenderParams[1] = {
        chunkNotifications: notifications => [notifications],
        sendNotifications: jest.fn(async notifications => {
            if (notifications[0].to === "ExponentPushToken[384]") {
                return [
                    {
                        type: "SuccessTicket" as const,
                        expoPushToken: notifications[0].to as string,
                        uuid: "my-uuid",
                        timestamp: "2021-08-27T17:40:34Z",
                        receiptId: "my-receipt-id",
                    },
                ];
            }
            fail("called with wrong expo push token");
        }),
        subsToMessages: (subs, message) => {
            if (subs[0].expoPushToken === "ExponentPushToken[384]") {
                return [
                    {
                        to: subs[0].expoPushToken,
                        sound: "default" as const,
                        title: message.text,
                        body: message.authorAndCountry,
                    },
                ];
            }
            fail("called with wrong expo push token");
        },
    };
    const awesomeMessage: SenderParams[2] = {
        getTodaysMessage: () =>
            Promise.resolve({
                text: "You are awesome!",
                authorAndCountry: "Phil from US",
            }),
    };
    const ticketRepo: SenderParams[3] = {
        putMany: jest.fn(() => Promise.resolve()),
    };
    const sender = new Sender(subsRepo, expoMock, awesomeMessage, ticketRepo);

    await sender.send("17:28");

    expect(expoMock.sendNotifications).toHaveBeenCalledWith([
        {
            to: "ExponentPushToken[384]",
            sound: "default",
            title: "You are awesome!",
            body: "Phil from US",
        },
    ]);
    expect(ticketRepo.putMany).toHaveBeenCalledWith([
        {
            type: "SuccessTicket",
            expoPushToken: "ExponentPushToken[384]",
            uuid: "my-uuid",
            timestamp: "2021-08-27T17:40:34Z",
            receiptId: "my-receipt-id",
        },
    ]);
});

it("does nothing if no subscriptions for given time", () => {
    // TODO write me
});
