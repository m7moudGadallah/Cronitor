const viewController = require('../controllers/view.controller');

module.exports = app => {
  app.get('/', viewController.getDashboard);
};
