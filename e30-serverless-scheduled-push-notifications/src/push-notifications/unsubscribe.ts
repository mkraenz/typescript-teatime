import {
    APIGatewayProxyEvent,
    APIGatewayProxyResultV2,
    Handler,
} from "aws-lambda";
import AWS from "aws-sdk";
import { ServiceConfigurationOptions } from "aws-sdk/lib/service";
import { IsDefined, IsString, validate } from "class-validator";
import { InvalidArgument } from "../util/custom.error";
import { parse } from "../utils/parse";
import { respond } from "../utils/respond";
import { assertEnvVar } from "../validation/assert";

interface IBody {
    token: string;
}

export class Body implements IBody {
    constructor(param: IBody) {
        this.token = param.token;
    }

    @IsString()
    @IsDefined()
    token: string;

    public async validate() {
        const errors = await validate(this);
        if (errors.length > 0) {
            throw new InvalidArgument(JSON.stringify(errors));
        }
    }
}

// https://github.com/aws/aws-sdk-js/issues/1635#issuecomment-316486871
const serviceConfigOptions: ServiceConfigurationOptions = {
    region: process.env.REGION,
    endpoint: process.env.IS_OFFLINE ? "http://localhost:7999" : undefined,
};

const docClient = new AWS.DynamoDB.DocumentClient(serviceConfigOptions);
assertEnvVar(process.env.SUBSCRIPTION_TABLE, "SUBSCRIPTION_TABLE");
const TableName = process.env.SUBSCRIPTION_TABLE;

export const handler: Handler<
    APIGatewayProxyEvent,
    APIGatewayProxyResultV2<{ statusCode: number }>
> = async event => {
    try {
        const { body } = event;
        if (!body) throw new InvalidArgument("Missing request body");
        const parsedBody = await parse<IBody>(body);
        const bodyInstance = new Body(parsedBody);
        await bodyInstance.validate();

        await docClient
            .delete({
                TableName,
                Key: { expoPushToken: bodyInstance.token },
            })
            .promise();
        return respond(202, { success: true });
    } catch (error) {
        return respond(500, error);
    }
};
