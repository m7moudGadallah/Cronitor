const healthChecksRepository = require('../repositories/health-checks.repository');

async function getHealthChecks() {
  return await healthChecksRepository.get();
}

async function createHealthCheck({ urlId, status, responseTime }) {
  return await healthChecksRepository.create({
    data: {
      urlId,
      status,
      responseTime,
    },
  });
}

module.exports = {
  getHealthChecks,
  createHealthCheck,
};
