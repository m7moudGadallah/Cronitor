const healthChecksController = require('./health-checks.controller');

module.exports = function mountApiRoutes(app) {
  healthChecksController(app);
};
