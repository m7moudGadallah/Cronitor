const { prisma } = require('../services/prisma.service');

class HealthChecksRepository {
  async get() {
    const healthChecks = await prisma.healthCheck.findMany({
      include: {
        url: true,
      },
    });

    return healthChecks.map(healthCheck => ({
      id: healthCheck.id,
      url: healthCheck.url.url,
      urlId: healthCheck.url.id,
      status: healthCheck.status,
      up: healthCheck.status < 400,
      responseTime: healthCheck.responseTime,
      timestamp: healthCheck.timestamp,
    }));
  }

  async create({ urlId, status, responseTime }) {
    return await prisma.healthCheck.create({
      data: {
        urlId,
        status,
        responseTime,
      },
    });
  }
}

module.exports = new HealthChecksRepository();
