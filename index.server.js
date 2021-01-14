require('./server/config/env');
const express = require('express');
const cors = require('cors');
const routes = require('./server');

const app = express();

app.use(cors());
app.set('trust proxy', 1); // trust first proxy

app.use(routes);

app.listen(5000, () => {
  console.log('🚀 server listening http://localhost:5000');
});
