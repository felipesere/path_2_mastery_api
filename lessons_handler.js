'use strict'

const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB();

const APPRENTICES_TABLE = process.env.DYNAMODB_TABLE;

const {lessons} = require('./lessons')

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
    console.log({apprentice})
    console.log("TABLE: ", APPRENTICES_TABLE)
    const params = {
        Key: {
            "email": {
                S: apprentice
            },
        },
        TableName: APPRENTICES_TABLE
    };
    dynamoDb.getItem(params, (err, data) => {
        if (err) {
            callback(null, {statusCode: 404, body: `Did not find ${apprentice}: ${JSON.stringify(err)} `})
        } else {
            callback(null, {statusCode: 200, body: JSON.stringify(data)})
        }
    })
}

module.exports = {
    all_lessons: all_lessons,
    read_path: read_path
}
