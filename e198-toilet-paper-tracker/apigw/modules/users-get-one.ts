import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import { ZuploContext, ZuploRequest } from "@zuplo/runtime";
import { dynamo, TableName } from "./utils/dynamodb";
import { InternalServerErrorException } from "./utils/responses";

export default async function (request: ZuploRequest, context: ZuploContext) {
  try {
    const id = request.params.id;
    // TODO fine-grained acess control

    const command = new GetItemCommand({
      TableName,
      Key: {
        id: {
          S: id,
        },
      },
    });
    const userRes = await dynamo.send(command);
    const resBody = {
      id,
      displayName: userRes.Item?.displayName.S,
      email: userRes.Item?.email.S,
    };
    return resBody;
  } catch (error) {
    context.log.error(error);
    return InternalServerErrorException();
  }
}
