import fs from 'fs/promises';
import path from 'path';

export const handler = async (event) => {
  try {
      const filePath = path.resolve('./data.json');
      
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const data = JSON.parse(fileContent);

      return {
          statusCode: 200,
          headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET"
          },
          body: JSON.stringify(data)
      };
  } catch (error) {
      return {
          statusCode: 500,
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ error: error.message })
      };
  }
};