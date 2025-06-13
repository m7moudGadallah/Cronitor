const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mountApiRoutes = require('./controllers');

// In-memory storage for demo (use a database in production)
const healthChecks = [
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
];

//

const PORT = process.env?.PORT;
const staticFilesDir = path.join(__dirname, '..', 'public');
const viewsDir = path.join(__dirname, 'views');

const app = express();

app.use(morgan('combined'));
app.set('view engine', 'ejs');
app.set('views', viewsDir);
app.use(express.static(staticFilesDir));

// Mount API Routes
mountApiRoutes(app);

app.get('/', (req, res) => {
  res.render('index.ejs', { checks: healthChecks.slice().reverse() });
});

app.listen(PORT, () => {
  console.log(`Monitor app running at http://localhost:${PORT} 🚀!`);
});
