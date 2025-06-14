const { query } = require('express-validator');

exports.getMonitoredUrlsValidator = [
  query('sort').optional().isString().withMessage('Sort must be a string'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Limit must be a positive integer'),
  query('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be true or false'),
];
