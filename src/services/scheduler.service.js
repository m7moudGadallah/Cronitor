const cron = require('node-cron');
const monitoredUrlsRepository = require('../repositories/monitored-urls.repository');
const healthChecksService = require('./health-checks.service');
const axios = require('axios');
const logger = require('./logger.service');

class Scheduler {
  #jobs = new Map();

  async init() {
    try {
      const monitoredUrls = await monitoredUrlsRepository.get({
        isActive: true,
      });

      monitoredUrls.forEach(item =>
        this.scheduleUrlCheck({
          urlId: item.id,
          url: item.url,
          interval: item.interval,
        })
      );
      logger.success(`Scheduled ${this.#jobs.size} monitoring jobs`);
    } catch (error) {
      logger.error(`Failed to initialize scheduler: ${error.message}`);
    }
  }

  scheduleUrlCheck({ urlId, url, interval }) {
    // If this URL already has a job, cancel it first
    if (this.#jobs.has(urlId)) {
      this.removeAllUrlCheck();
    }

    // Schedule new job
    const job = cron.schedule(interval, () =>
      this.#outBoundRequest({ urlId, url })
    );

    // Store the job reference
    this.#jobs.set(urlId, job);

    logger.info(`Scheduled check for ${url} (${interval})`);
  }

  unscheduleAllUrlCheck({ urlId }) {
    if (this.#jobs.has(urlId)) {
      this.#jobs.get(urlId).stop();
      this.#jobs.delete(urlId);
      logger.warning(`Stopped monitoring job ${urlId}`);
    }
  }

  clear() {
    const numOfJobs = this.#jobs.size;
    this.#jobs.entries(([urlId]) => this.unscheduleAllUrlCheck({ urlId }));
    console.log(`All cron jobs destroyed (${numOfJobs} job)!`);
    console.log(chalk.red(`✗ Cleared ${numOfJobs} monitoring jobs`));
  }

  async #outBoundRequest({ urlId, url }) {
    const startTime = Date.now();
    let responseTime = 0;
    let status = 0;

    try {
      const OUTBOUND_TIMEOUT = process.env.OUTBOUND_TIMEOUT
        ? +process.env.OUTBOUND_TIMEOUT
        : 10000;

      const response = await axios.get(url, { timeout: OUTBOUND_TIMEOUT });
      responseTime = Date.now() - startTime;
      status = response.status;
    } catch (error) {
      responseTime = Date.now() - startTime;

      if (error.response) {
        status = error.response.status; // HTTP response received with error status
      } else if (error.request) {
        status = 408; // Timeout or no response
      } else {
        status = 520; // Unknown error
      }

      logger.error(`Request to ${url} failed: ${error.message}`);
    } finally {
      await healthChecksService.createHealthCheck({
        urlId,
        status,
        responseTime,
      });

      logger.httpRequest({
        method: 'GET',
        url,
        status,
        responseTime,
      });
    }
  }
}

module.exports = new Scheduler();
