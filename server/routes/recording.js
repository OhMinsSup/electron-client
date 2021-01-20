const { Router } = require('express');

const recording = Router();

recording.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    error: null,
  });
});

recording.post('/', (req, res) => {
  res.status(200).json({
    ok: true,
    error: null,
  });
});

recording.delete('/', (req, res) => {
  res.status(200).json({
    ok: true,
    error: null,
  });
});

module.exports = recording;
