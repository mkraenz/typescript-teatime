import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { ZuploContext, ZuploRequest, environment } from "@zuplo/runtime";

export default async function (request: ZuploRequest, context: ZuploContext) {
  try {
    context.log.log("started");
    // can we move these into module scope?
    const accessKeyId = environment.AWS_ACCESS_KEY_ID;
    const secretAccessKey = environment.AWS_ACCESS_KEY_SECRET;
    const region = environment.AWS_REGION;
    const TableName = environment.AWS_DYNAMODB_TABLE_NAME;
    const client = new DynamoDBClient({
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      region,
    });

    const body = await request.json();

    const command = new PutItemCommand({
      TableName,
      Item: {
        id: {
          S: body.id,
        },
        displayName: {
          S: body.displayName,
        },
        email: {
          S: body.email,
        },
      },
    });
    await client.send(command);
    context.log.log("Stuff");
    return {
      id: "1234",
    };
  } catch (error) {
    context.log.error(error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
    };
  }
}
