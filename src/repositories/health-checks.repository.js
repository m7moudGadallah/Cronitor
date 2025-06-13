class HealthChecksRepository {
  get() {
    return Promise.resolve([
      {
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        url: 'https://google.com',
        up: true,
        status: 200,
        responseTime: 142,
      },
      {
        timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
        url: 'https://example.com',
        up: true,
        status: 200,
        responseTime: 98,
      },
      {
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        url: 'https://my-api-service.com',
        up: false,
        status: 503,
        responseTime: 1200,
      },
      {
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        url: 'https://test-website.org',
        up: true,
        status: 200,
        responseTime: 210,
      },
      {
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        url: 'https://down-for-maintenance.com',
        up: false,
        status: 404,
        responseTime: 320,
      },
    ]);
  }
}

module.exports = new HealthChecksRepository();
