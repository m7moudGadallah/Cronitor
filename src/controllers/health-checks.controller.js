const healthChecksRepo = require('../repositories/health-checks.repository');
const JsonResponseSchema = require('../utils/json-response-schema.util');

module.exports = {
  get: async (_, res) => {
    const healthChecks = await healthChecksRepo.get();
    res.status(200).json(new JsonResponseSchema({ data: healthChecks }));
  },
};
