const { Router } = require('express');

const user = Router();

user.get('/', (req, res) => {
  res.status(200).json({
    user: null,
  });
});

module.exports = user;
