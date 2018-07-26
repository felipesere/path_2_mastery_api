"use strict";
import { lessons } from "./lessons";
import dynogels from "dynogels";
import Joi from "joi";

dynogels.AWS.config.update({ region: "eu-west-2" });
const APPRENTICES_TABLE = process.env.DYNAMODB_TABLE;

const Lesson = Joi.object().keys({
  description: Joi.string(),
  id: Joi.number(),
  language: Joi.string(),
  outcomes: Joi.array().items(Joi.string()),
  outputs: Joi.array().items(Joi.string()),
  status: Joi.string().valid("none", "current", "todo", "done"),
  subtitle: Joi.string(),
  title: Joi.string()
});

const Path = Joi.object().keys({
  email: Joi.string(),
  path: Joi.array().items(Lesson)
});

const PathOfApprentice = dynogels.define("Path", {
  hashKey: "email",
  schema: Path,
  tableName: APPRENTICES_TABLE
});

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
  PathOfApprentice.get(apprentice, (err, path) => {
    if (err) {
      callback(null, notFound(apprentice, err));
    } else {
      callback(null, found(path));
    }
  });
};

module.exports = {
  all_lessons,
  read_path
};
