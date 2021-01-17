const { Router } = require('express');
const auth = require('./routes/auth');
const user = require('./routes/user');
const meeting = require('./routes/meeting');
const file = require('./routes/file');

const api = Router();

api.use('/api/auth', auth);
api.use('/api/user', user);
api.use('/api/meeting', meeting);
api.use('/api/file', file);

module.exports = api;
