const healthChecksController = require('../controllers/health-checks.controller');
const monitoredUrlsController = require('../controllers/monitored-urls.controller');
const validateMiddleware = require('../middlewares/validate.middleware');
const {
  getMonitoredUrlsValidator,
} = require('../validators/monitored-urls.validator');

module.exports = app => {
  // HealthChecks Routes
  app.route('/api/v1/health-checks').get(healthChecksController.get);

  // MonitoredUrls Routes
  app
    .route('/api/v1/monitored-urls')
    .post(monitoredUrlsController.create)
    .get(
      getMonitoredUrlsValidator,
      validateMiddleware,
      monitoredUrlsController.get
    );
};
