module.exports = class JsonResponseSchema {
  constructor({ statusCode = 200, data, message, errors }) {
    this.success = statusCode < 400;
    this.data = data;
    this.message = message;
    this.errors = errors;
  }
};
