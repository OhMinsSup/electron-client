const { Router } = require('express');

const user = Router();

user.get('/', (req, res) =>
  res.status(200).json({
    oK: false,
    error: null,
    user: req.session.user || null,
  }),
);

module.exports = user;
