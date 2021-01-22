const { Router } = require('express');

const notification = Router();

notification.get('/', (req, res) => {
  res.status(200).json(true);
});

module.exports = notification;