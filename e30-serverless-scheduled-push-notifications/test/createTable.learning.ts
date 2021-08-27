import AWS from "aws-sdk";
import { ServiceConfigurationOptions } from "aws-sdk/lib/service";

// https://github.com/aws/aws-sdk-js/issues/1635#issuecomment-316486871
const serviceConfigOptions: ServiceConfigurationOptions = {
    region: "us-west-2",
    endpoint: "http://localhost:7999", // disable
};

// control plane -> managing tables, indices
const dynamodb = new AWS.DynamoDB(serviceConfigOptions);
// data plane -> managing items inside tables
const docClient = new AWS.DynamoDB.DocumentClient(serviceConfigOptions);

const TableName = "PushNotificationSubs-prod";

/** WARNING: Cannot be run twice */
export const createTable = async () => {
    const table = await dynamodb
        .createTable({
            TableName,
            AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
            KeySchema: [
                {
                    AttributeName: "id",
                    KeyType: "HASH",
                },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 3,
                WriteCapacityUnits: 3,
            },
        })
        .promise();
    console.log(table.TableDescription?.TableName);
};

export const dropTable = async (dynamoDb: AWS.DynamoDB, tableName: string) => {
    await dynamoDb
        .deleteTable({
            TableName: tableName,
        })
        .promise();
};

export const createActualTable = async () => {
    const table = await dynamodb
        .createTable({
            TableName,
            KeySchema: [
                { AttributeName: "time", KeyType: "HASH" }, //Partition key
                { AttributeName: "expoPushToken", KeyType: "RANGE" }, //Sort key
            ],
            AttributeDefinitions: [
                { AttributeName: "time", AttributeType: "S" }, // hh:mm
                { AttributeName: "expoPushToken", AttributeType: "S" },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
            },
        })
        .promise();
    console.log(table.TableDescription?.TableName);
};

export const createSubsTable = async (
    dynamoDb: AWS.DynamoDB,
    tableName: string
) => {
    await dynamoDb
        .createTable({
            TableName: tableName,
            KeySchema: [{ AttributeName: "expoPushToken", KeyType: "HASH" }],
            AttributeDefinitions: [
                { AttributeName: "expoPushToken", AttributeType: "S" },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
            },
        })
        .promise();
};

export const createTicketsTable = async (
    dynamoDb: AWS.DynamoDB,
    tableName: string
) => {
    await dynamoDb
        .createTable({
            TableName: tableName,
            KeySchema: [
                { AttributeName: "type", KeyType: "HASH" },
                {
                    AttributeName: "uuid",
                    KeyType: "RANGE",
                },
            ],
            AttributeDefinitions: [
                { AttributeName: "type", AttributeType: "S" },
                {
                    AttributeName: "uuid",
                    AttributeType: "S",
                },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
            },
        })
        .promise();
};

export const createGsiSubsByTime = async (
    dynamoDb: AWS.DynamoDB,
    tableName: string,
    IndexName: string
) => {
    await dynamoDb
        .updateTable({
            TableName: tableName,
            AttributeDefinitions: [
                { AttributeName: "time", AttributeType: "S" },
                { AttributeName: "expoPushToken", AttributeType: "S" },
            ],
            GlobalSecondaryIndexUpdates: [
                {
                    Create: {
                        IndexName,
                        KeySchema: [
                            { AttributeName: "time", KeyType: "HASH" },
                            {
                                AttributeName: "expoPushToken",
                                KeyType: "RANGE",
                            },
                        ],
                        Projection: {
                            ProjectionType: "ALL",
                        },
                        ProvisionedThroughput: {
                            ReadCapacityUnits: 5,
                            WriteCapacityUnits: 5,
                        },
                    },
                },
            ],
        })
        .promise();
};

export const createItem = async () => {
    await docClient
        .put({
            TableName,
            Item: {
                time: "23:54",
                expoPushToken: "xxxxxxxxxxxxxxxxxxxxxx",
            },
        })
        .promise();
};

const getItem = async () => {
    const res = await docClient
        .get({ TableName, Key: { id: "2349534" } })
        .promise();
    console.log(res.Item);
};

const updateItem = async () => {
    const updated = await docClient
        .update({
            TableName,
            Key: { id: "2349534" },
            // ex: SET a=:value1, b=:value2 DELETE :value3, :value4, :value5
            UpdateExpression: "SET #s = :s REMOVE message, details",
            ExpressionAttributeValues: {
                ":s": "ok",
            },
            ExpressionAttributeNames: {
                "#s": "status",
            },
            ReturnValues: "UPDATED_NEW",
        })
        .promise();
    console.log(updated);
};

const revertUpdateItem = async () => {
    const updated = await docClient
        .update({
            TableName,
            Key: { id: "2349534" },
            // ex: SET a=:value1, b=:value2 DELETE :value3, :value4, :value5
            UpdateExpression: "SET #s = :s, message = :m, details = :d",
            ExpressionAttributeValues: {
                ":s": "error",
                ":m": '\\"ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]\\" is not a registered push notification recipient',
                ":d": {
                    error: "DeviceNotRegistered",
                },
            },
            ExpressionAttributeNames: {
                "#s": "status",
            },
            ReturnValues: "UPDATED_NEW",
        })
        .promise();
    console.log(updated);
};

const deleteItem = async () => {
    const updated = await docClient
        .delete({
            TableName,
            Key: { id: "2349534" },
        })
        .promise();
    console.log(updated);
};

const main = async () => {
    await dropTable(dynamodb, TableName);
    await createSubsTable(dynamodb, TableName);
    await createGsiSubsByTime(dynamodb, TableName, "TimeIndex");
    // await createTable();
    // await createItem();
    // await getItem();
    // await updateItem();
    // await revertUpdateItem();
    // await deleteItem();
};

main();
