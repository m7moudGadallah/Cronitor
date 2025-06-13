const healthChecksService = require('../services/health-checks.service');
const JsonResponseSchema = require('../utils/json-response-schema.util');

module.exports = {
  get: async (_, res) => {
    const healthChecks = await healthChecksService.getHealthChecks();
    res.status(200).json(new JsonResponseSchema({ data: healthChecks }));
  },
};
