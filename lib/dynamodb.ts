import { DynamoDB } from 'aws-sdk';

let dynamodbClient: DynamoDB.DocumentClient;

export const getDynamoDb = () => {
  if (!dynamodbClient) {
    dynamodbClient = new DynamoDB.DocumentClient({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
      },
      region: process.env.AWS_REGION || 'us-east-1'
    });
  }
  return dynamodbClient;
};

export const Tables = {
  TOOLS: 'toolkitverse-tools',
  TOOL_DETAILS: 'toolkitverse-tool-details',
  NEWS: 'toolkitverse-news',
  TOOL_COMPARISONS: 'toolkitverse-comparisons',
  PAYMENTS: 'toolkitverse-payments',
  USERS: 'toolkitverse-users'
};

export const createTables = async () => {
  const dynamodb = new DynamoDB({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
    },
    region: process.env.AWS_REGION || 'us-east-1'
  });

  const tables = [
    {
      TableName: Tables.TOOLS,
      KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
      AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
      ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 }
    },
    {
      TableName: Tables.TOOL_DETAILS,
      KeySchema: [{ AttributeName: 'toolId', KeyType: 'HASH' }],
      AttributeDefinitions: [{ AttributeName: 'toolId', AttributeType: 'S' }],
      ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 }
    },
    {
      TableName: Tables.NEWS,
      KeySchema: [
        { AttributeName: 'date', KeyType: 'HASH' },
        { AttributeName: 'id', KeyType: 'RANGE' }
      ],
      AttributeDefinitions: [
        { AttributeName: 'date', AttributeType: 'S' },
        { AttributeName: 'id', AttributeType: 'S' }
      ],
      ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 }
    },
    {
      TableName: Tables.TOOL_COMPARISONS,
      KeySchema: [{ AttributeName: 'comparisonId', KeyType: 'HASH' }],
      AttributeDefinitions: [{ AttributeName: 'comparisonId', AttributeType: 'S' }],
      ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 }
    }
  ];

  for (const tableParams of tables) {
    try {
      await dynamodb.createTable(tableParams).promise();
      console.log(`Created table: ${tableParams.TableName}`);
    } catch (error: any) {
      if (error.code === 'ResourceInUseException') {
        console.log(`Table already exists: ${tableParams.TableName}`);
      } else {
        throw error;
      }
    }
  }
};
