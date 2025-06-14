const { query, body } = require('express-validator');
const cron = require('node-cron');

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

  query('name').optional().isString().withMessage('Name must be a string'),

  query('id').optional().isUUID().withMessage('ID must be a valid UUID'),
];

exports.createMonitoredUrlValidator = [
  body('url')
    .exists({ checkFalsy: true })
    .withMessage('URL is required')
    .isURL()
    .withMessage('Must be a valid URL'),

  body('name')
    .exists({ checkFalsy: true })
    .withMessage('Name is required')
    .isString()
    .withMessage('Must be a string')
    .trim()
    .escape(),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('Must be true or false')
    .toBoolean(),

  body('interval')
    .optional()
    .custom(value => {
      if (!cron.validate(value)) {
        throw new Error('Interval must be a valid cron expression');
      }
      return true;
    }),
];
