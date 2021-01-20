const { Router } = require('express');
const auth = require('./routes/auth');
const user = require('./routes/user');
const meeting = require('./routes/meeting');

const api = Router();

api.use('/api/auth', auth);
api.use('/api/user', user);
api.use('/api/meeting', meeting);

module.exports = api;
