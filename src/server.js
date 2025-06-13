const express = require('express');
const path = require('path');
const preRoutesMiddleware = require('./middlewares/pre-routes.middleware');
const mountApiRoutes = require('./routes/api.routes');
const mountViewsRoutes = require('./routes/views.routes');
const {
  connect: prismaConnect,
  disconnect: prismaDisconnect,
} = require('./services/prisma.service');

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

app.listen(PORT, async () => {
  // Database connection
  await prismaConnect();
  console.log(`Monitor app running at http://localhost:${PORT} 🚀!`);
});

// Handle shutdown
process.on('SIGINT', async () => {
  await prismaDisconnect();
  process.exit();
});
