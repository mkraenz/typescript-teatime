import { Handler, SQSEvent } from "aws-lambda";

export const handler: Handler<SQSEvent> = async (event, context) => {
    console.log(event);
    const bodies = event.Records.map(record => record.body);
    const ticketUuids = bodies.map(body => JSON.parse(body).ticketUuid);
    console.log(ticketUuids);

    // TODO enable if you want to test the Dead letter queue DLQ
    // throw new Error('i need to error for reasons')
    // TODO delete messages from the queue after processing succeeded

    return {
        body: ticketUuids,
        statusCode: 200,
    };
};
