const express = require('express');
const morgan = require('morgan');

module.exports = ({ app, staticFilesDir, viewsDir }) => {
  app.use(morgan('combined'));
  app.set('view engine', 'ejs');
  app.set('views', viewsDir);
  app.use(express.static(staticFilesDir));
};
