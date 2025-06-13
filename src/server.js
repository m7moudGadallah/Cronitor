const express = require('express');
const path = require('path');
const preRoutesMiddleware = require('./middlewares/pre-routes.middleware');
const mountApiRoutes = require('./routes/api.routes');
const mountViewsRoutes = require('./routes/views.routes');
const {
  connect: prismaConnect,
  disconnect: prismaDisconnect,
} = require('./services/prisma.service');
const scheduler = require('./services/scheduler.service');
const logger = require('./services/logger.service');

const PORT = process.env?.PORT;
const staticFilesDir = path.join(__dirname, '..', 'public');
const viewsDir = path.join(__dirname, 'views');

const app = express();

// Mount Pre Routes Middleware
preRoutesMiddleware({ app, staticFilesDir, viewsDir });

// Mount API Routes
mountApiRoutes(app);

// Mount Views Routes
mountViewsRoutes(app);

// Server startup handler
const startServer = async () => {
  try {
    // Database connection
    await prismaConnect();

    // Initialize scheduler
    await scheduler.init();

    const server = app.listen(PORT, () => {
      logger.success(`Monitor app running at http://localhost:${PORT} 🚀!`);
    });

    // Handle shutdown gracefully
    const shutdown = async () => {
      logger.warning('Shutting down server gracefully...');

      // Stop all scheduled jobs
      scheduler.clear();

      // Disconnect from database
      await prismaDisconnect();

      // Close the server
      server.close(() => {
        logger.warning('Server has been stopped');
        process.exit(0);
      });

      // Force shutdown after 5 seconds if not closed
      setTimeout(() => {
        logger.error('Forcing shutdown...');
        process.exit(1);
      }, 5000);
    };

    // Handle various shutdown signals
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
    process.on('SIGQUIT', shutdown);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
