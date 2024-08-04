import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { ZuploContext, ZuploRequest, environment } from "@zuplo/runtime";

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

const resolveBadRequestInvalidId = () => {
  const resBody = JSON.stringify({
    statusCode: 400,
    message: "Bad Request. id must be identical to user sub",
  });
  return new Response(resBody, {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
};

export default async function (request: ZuploRequest, context: ZuploContext) {
  try {
    const body = await request.json();
    // if (request.user?.sub !== body.id) {
    //   return resolveBadRequestInvalidId();
    // }

    const { id, displayName, email } = body;
    context.log.error({ msg: "Creating user", id });

    const command = new PutItemCommand({
      TableName,
      Item: {
        id: {
          S: id,
        },
        displayName: {
          S: displayName,
        },
        email: {
          S: email,
        },
      },
      ConditionExpression: "attribute_not_exists(id)", // only insert, no update
    });
    await client.send(command);
    context.log.info({ msg: "Created user", id });
    const resBody = JSON.stringify({ id, displayName, email });
    return new Response(resBody, {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const userAlreadyExists = error.name === "ConditionalCheckFailedException";
    if (userAlreadyExists) {
      const resBody = JSON.stringify({
        statusCode: 409,
        message: "Conflict. User already exists",
      });
      return new Response(resBody, {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    context.log.error(error);
    const resBody = JSON.stringify({
      statusCode: 500,
      message: "Internal Server Error",
    });
    return new Response(resBody, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
