const express = require('express');
const morgan = require('morgan');

const PORT = process.env?.PORT;

const app = express();

app.use(morgan('combined'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('<h1>Hi!</h1>');
});

app.listen(PORT, () => {
  console.log(`Monitor app running at http://localhost:${PORT} 🚀!`);
});
