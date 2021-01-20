const { Router } = require('express');
const { default: axios } = require('axios');
const queryString = require('query-string');

const authorized = require('../middlewares/authorized');
const { ZOOM_API } = require('../config/contant');

const recording = Router();

recording.get('/', authorized, async (req, res) => {
  try {
    const { id: userId } = req.session.user;
    const query = queryString.stringify(req.query);
    const url = `${ZOOM_API}/users/${userId}/recordings?`.concat(query || '');

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${res.locals.accessToken}`,
      },
    });

    return res.status(200).json({
      ok: true,
      error: null,
      recording: response.data,
    });
  } catch (e) {
    console.error(e);
    return res.status(e.response.status || 400).json({
      ok: false,
      error: 'Error: 4000: Data is NotFound',
    });
  }
});

module.exports = recording;
