'use strict'

const {lessons} = require('./lessons')

module.exports.all_lessons = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(lessons),
    headers: {
      "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
    }
  }

  callback(null, response)
}
