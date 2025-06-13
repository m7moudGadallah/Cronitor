const { prisma } = require('../database/prisma');

class MonitoredUrlsRepository {
  async get() {
    return await prisma.monitoredUrl.findMany();
  }

  async create({ url, name, interval, isActive }) {
    return await prisma.monitoredUrl.create({
      data: {
        url,
        name,
        interval,
        isActive,
      },
    });
  }
}

module.exports = new MonitoredUrlsRepository();
