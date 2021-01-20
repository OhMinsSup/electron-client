const { Router } = require('express');

const authorized = require('../middlewares/authorized');

const user = Router();

user.get('/', authorized, (req, res) =>
  res.status(200).json({
    oK: false,
    error: null,
    user: req.session.user || null,
  }),
);

module.exports = user;
