'use strict'
import AWS from "aws-sdk";
import {lessons} from "./lessons";

const dynamoDb = new AWS.DynamoDB();
const APPRENTICES_TABLE = process.env.DYNAMODB_TABLE;

const all_lessons = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify(lessons),
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }

    callback(null, response)
}

const where = ({email}) => {
    return {
        Key: {
            "email": {
                S: email
            },
        },
        TableName: APPRENTICES_TABLE
    };
}

const read_path = (event, context, callback) => {
    const apprentice = event.pathParameters.apprentices_id
    dynamoDb.getItem(where({email: apprentice}), (err, data) => {
        if (err) {
            callback(null, {statusCode: 404, body: `Did not find ${apprentice}: ${JSON.stringify(err)} `})
        } else {
            callback(null, {statusCode: 200, body: JSON.stringify(data)})
        }
    })
}

module.exports = {
    all_lessons,
    read_path
}
