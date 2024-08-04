import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { ZuploContext, ZuploRequest } from "@zuplo/runtime";
import { dynamo, TableName } from "./utils/dynamodb";
import {
  ConflictException,
  CreatedResponse,
  InternalServerErrorException,
} from "./utils/responses";

export default async function (request: ZuploRequest, context: ZuploContext) {
  try {
    const body = await request.json();
    // if (request.user?.sub !== body.id) {
    //   return BadRequestException('id must be identical to user sub');
    // }

    const { id, displayName, email } = body;
    context.log.info({ msg: "Creating user", id });

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
    await dynamo.send(command);
    context.log.info({ msg: "Created user", id });
    const resBody = { id, displayName, email };
    return CreatedResponse(resBody);
  } catch (error) {
    const userAlreadyExists = error.name === "ConditionalCheckFailedException";
    if (userAlreadyExists) return ConflictException("User already exists.");

    context.log.error(error);
    return InternalServerErrorException();
  }
}
