const monitoredUrlsRepository = require('../repositories/monitored-urls.repository');
const JsonResponseSchema = require('../utils/json-response-schema.util');

module.exports = {
  get: async (_, res) => {
    const monitoredUrls = await monitoredUrlsRepository.get();
    res.status(200).json(new JsonResponseSchema({ data: monitoredUrls }));
  },

  create: async (req, res) => {
    const monitoredUrl = await monitoredUrlsRepository.create(req.body);
    res
      .status(201)
      .json(new JsonResponseSchema({ statusCode: 201, data: monitoredUrl }));
  },
};
