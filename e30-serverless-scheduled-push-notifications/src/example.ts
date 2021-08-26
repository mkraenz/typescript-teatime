import {
    APIGatewayProxyEvent,
    APIGatewayProxyResultV2,
    Handler,
} from "aws-lambda";

export const handler: Handler<
    APIGatewayProxyEvent,
    APIGatewayProxyResultV2<{ statusCode: number }>
> = async (event, context) => {
    console.log(event);
    return {
        body: JSON.stringify({
            twitchChannel: "typescriptteatime",
            url: "https://www.twitch.tv/typescriptteatime",
            doWeDrinkTea: "yes, we do drink tea",
            areAllPeopleInChatAmazing: "yes, everyone is amazing",
            isAutoTFAmazingToo: "yes, he is amazing",
        }),
        statusCode: 200,
    };
};
