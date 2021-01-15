require('./server/config/env');
const express = require('express');
const cors = require('cors');
const routes = require('./server');
const hydrateUser = require('./server/middlewares/auth');

const app = express();


app.use(cors());
app.use(express.json());
app.use(hydrateUser);

app.set('trust proxy', 1); // trust first proxy

app.use(routes);

app.get('/', (_req, res) => res.json('ok'));

app.listen(5000, () => {
  console.log('🚀 server running http://localhost:5000');
});
