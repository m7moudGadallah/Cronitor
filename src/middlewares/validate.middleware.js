const { validationResult } = require('express-validator');
const JsonResponseSchema = require('../utils/json-response-schema.util');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(
      new JsonResponseSchema({
        statusCode: 422,
        errors: errors.array().map(e => ({
          field: e.param,
          message: e.msg,
        })),
      })
    );
  }
  next();
};
