const { prisma } = require('../services/prisma.service');
const normalizeTextUtil = require('../utils/normalize-text.util');

class MonitoredUrlsRepository {
  async get() {
    return await prisma.monitoredUrl.findMany();
  }

  async create({ url, name, interval, isActive }) {
    return await prisma.monitoredUrl.create({
      data: {
        url,
        name,
        normalizedName: normalizeTextUtil(name),
        interval,
        isActive,
      },
    });
  }
}

module.exports = new MonitoredUrlsRepository();
