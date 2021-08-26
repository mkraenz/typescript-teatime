export const respond = (statusCode: number, body: object | Error) => {
    if (body instanceof Error) {
        console.error(body);
        if (statusCode >= 500) {
            // https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-output-format
            throw body;
        }
        return {
            statusCode,
            body: JSON.stringify({ error: true, message: body.message }),
            headers: {
                "Content-Type": "application/json",
            },
        };
    }
    return {
        statusCode,
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    };
};
