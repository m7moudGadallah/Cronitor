const monitoredUrlsService = require('../services/monitored-urls.service');
const JsonResponseSchema = require('../utils/json-response-schema.util');

module.exports = {
  get: async (req, res) => {
    const monitoredUrls = await monitoredUrlsService.getMonitoredUrls(
      req.query
    );
    res.status(200).json(new JsonResponseSchema({ data: monitoredUrls }));
  },

  create: async (req, res) => {
    const monitoredUrl = await monitoredUrlsService.createMonitoredUrl(
      req.body
    );
    res
      .status(201)
      .json(new JsonResponseSchema({ statusCode: 201, data: monitoredUrl }));
  },
};
