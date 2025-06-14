const healthChecksController = require('../controllers/health-checks.controller');
const monitoredUrlsController = require('../controllers/monitored-urls.controller');
const validateMiddleware = require('../middlewares/validate.middleware');
const {
  getMonitoredUrlsValidator,
  createMonitoredUrlValidator,
} = require('../validators/monitored-urls.validator');

module.exports = app => {
  // HealthChecks Routes
  app.route('/api/v1/health-checks').get(healthChecksController.get);

  // MonitoredUrls Routes
  app
    .route('/api/v1/monitored-urls')
    .post(
      createMonitoredUrlValidator,
      validateMiddleware,
      monitoredUrlsController.create
    )
    .get(
      getMonitoredUrlsValidator,
      validateMiddleware,
      monitoredUrlsController.get
    );
};
