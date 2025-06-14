const { prisma } = require('../services/prisma.service');
const normalizeTextUtil = require('../utils/normalize-text.util');
const BaseRepository = require('./base.repository');

class MonitoredUrlsRepository extends BaseRepository {
  async get({ sort, page, limit, isActive }) {
    const queryOptions = this._buildQueryOptions({
      page,
      limit,
      sort,
      filters: { isActive },
    });
    if (!queryOptions?.orderBy) {
      queryOptions.orderBy = {
        createdAt: 'asc',
      };
    }

    return await prisma.monitoredUrl.findMany(queryOptions);
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
