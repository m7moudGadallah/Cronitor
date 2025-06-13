const monitoredUrlsRepository = require('../repositories/monitored-urls.repository');
const JsonResponseSchema = require('../utils/json-response-schema.util');

module.exports = {
  create: async (req, res) => {
    const monitoredUrl = await monitoredUrlsRepository.create(req.body);
    res
      .status(201)
      .json(new JsonResponseSchema({ statusCode: 201, data: monitoredUrl }));
  },
};
