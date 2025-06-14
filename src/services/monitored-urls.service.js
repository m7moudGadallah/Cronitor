const monitoredUrlsRepository = require('../repositories/monitored-urls.repository');
const schedulerService = require('./scheduler.service');

async function getMonitoredUrls({ sort, page, limit, isActive, id, name }) {
  return await monitoredUrlsRepository.get({
    sort,
    page,
    limit,
    isActive,
    id,
    name,
  });
}

async function createMonitoredUrl({ url, name, interval, isActive }) {
  const monitoredUrl = await monitoredUrlsRepository.create({
    url,
    name,
    interval,
    isActive,
  });

  if (monitoredUrl.isActive) {
    schedulerService.scheduleUrlCheck({
      urlId: monitoredUrl.id,
      url: monitoredUrl.url,
      interval: monitoredUrl.interval,
    });
  }

  return monitoredUrl;
}

module.exports = {
  getMonitoredUrls,
  createMonitoredUrl,
};
