const healthChecksRepo = require('../repositories/health-checks.repository');
const JsonResponseSchema = require('../utils/json-response-schema.util');

module.exports = app => {
  app.get('/api/v1/health-checks', async (req, res) => {
    console.log('hi');
    const healthChecks = await healthChecksRepo.get();
    console.log('hi2');
    console.log(healthChecks);
    res.status(200).json(new JsonResponseSchema({ data: healthChecks }));
  });
};
