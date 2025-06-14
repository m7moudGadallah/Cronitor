const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

module.exports = ({ app, staticFilesDir, viewsDir }) => {
  app.use(cors());
  app.use(morgan(process.env?.NODE_ENV == 'dev' ? 'dev' : 'combined'));
  app.set('view engine', 'ejs');
  app.set('views', viewsDir);
  app.use(express.static(staticFilesDir));
  app.use(express.json());
};
