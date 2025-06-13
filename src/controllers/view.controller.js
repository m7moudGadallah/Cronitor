const healthChecksRepo = require('../repositories/health-checks.repository');

module.exports = {
  getDashboard: async (_, res) => {
    const healthChecks = await healthChecksRepo.get();
    res.render('index.ejs', { checks: healthChecks });
  },

  getSettings: async (_, res) => {
    res.render('settings.ejs', {});
  },
};
