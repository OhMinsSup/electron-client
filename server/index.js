const { Router } = require('express');
const auth = require('./routes/auth');
const user = require('./routes/user');

const api = Router();

api.use('/api/auth', auth);
api.use('/api/user', user);

module.exports = api;
