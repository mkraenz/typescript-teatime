import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { environment } from "@zuplo/runtime";

const accessKeyId = environment.AWS_ACCESS_KEY_ID;
const secretAccessKey = environment.AWS_ACCESS_KEY_SECRET;
const region = environment.AWS_REGION;
export const TableName = environment.AWS_DYNAMODB_TABLE_NAME;
export const dynamo = new DynamoDBClient({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});
