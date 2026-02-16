import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ScanCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  try {
    const result = await ddbDocClient.send(
      new ScanCommand({
        TableName: "children-movies-database"
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    };
  } catch (err) {
    console.error("Erro no scan:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Erro ao buscar filmes" })
    };
  }
};