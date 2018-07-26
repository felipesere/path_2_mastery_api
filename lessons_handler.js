"use strict";
import AWS from "aws-sdk";
import { lessons } from "./lessons";

const dynamoDb = new AWS.DynamoDB();
const APPRENTICES_TABLE = process.env.DYNAMODB_TABLE;

const all_lessons = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(lessons),
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  };

  callback(null, response);
};

const where = ({ email }) => {
  return {
    Key: {
      email: {
        S: email
      }
    },
    TableName: APPRENTICES_TABLE
  };
};

const notFound = (apprentice, err) => {
  return {
    statusCode: 404,
    body: `Did not find ${apprentice}: ${JSON.stringify(err)} `
  };
};

const found = data => {
  return { statusCode: 200, body: JSON.stringify(data) };
};

const read_path = (event, context, callback) => {
  const apprentice = event.pathParameters.apprentices_id;
  dynamoDb.getItem(where({ email: apprentice }), (err, data) => {
    if (err) {
      callback(null, notFound(apprentice, err));
    } else {
      callback(null, found(data));
    }
  });
};

module.exports = {
  all_lessons,
  read_path
};
