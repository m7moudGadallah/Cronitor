const healthChecksController = require('../controllers/health-checks.controller');
const monitoredUrlsController = require('../controllers/monitored-urls.controller');

module.exports = app => {
  // HealthChecks Routes
  app.route('/api/v1/health-checks').get(healthChecksController.get);

  // MonitoredUrls Routes
  app.route('/api/v1/monitored-urls').post(monitoredUrlsController.create);
};
