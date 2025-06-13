const healthChecksController = require('../controllers/health-checks.controller');

module.exports = app => {
  // HealthChecks Routes
  app.get('/api/v1/health-checks', healthChecksController.get);
};
