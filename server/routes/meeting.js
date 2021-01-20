const { Router } = require('express');
const axios = require('axios').default;
const queryString = require('query-string');

const authorized = require('../middlewares/authorized');
const { ZOOM_API } = require('../config/contant');

const meeting = Router();

meeting.get('/', authorized, async (req, res) => {
  const { id: userId } = req.session.user;
  const query = queryString.stringify(req.query);
  const url = `${ZOOM_API}/users/${userId}/meetings?`.concat(query || '');

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${res.locals.accessToken}`,
      },
    });

    return res.status(200).json({
      ok: true,
      error: null,
      ...response.data,
    });
  } catch (e) {
    console.error(e);
    return res.status(e.response.status).json({
      ok: false,
      error: 'Error: 4000: Data is NotFound',
    });
  }
});

meeting.post('/', authorized, async (req, res) => {
  const { id: userId } = req.session.user;

  try {
    const response = await axios.post(
      `${ZOOM_API}/users/${userId}/meetings`,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${res.locals.accessToken}`,
        },
      },
    );

    return res.status(200).json({
      ok: true,
      error: null,
      meeting: response.data,
    });
  } catch (e) {
    console.error(e);
    return res.status(e.response.status).json({
      ok: false,
      error: 'Error: 4000: Data is NotFound',
    });
  }
});

meeting.delete('/:meetingId', authorized, async (req, res) => {
  const { meetingId } = req.params;
  const query = queryString.stringify(req.query);
  const url = `${ZOOM_API}/meetings/${meetingId}?`.concat(query || '');

  try {
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${res.locals.accessToken}`,
      },
    });

    return res.status(200).json({
      ok: true,
      error: null,
    });
  } catch (e) {
    console.error(e);
    return res.status(e.response.status).json({
      ok: false,
      error: 'Error: 4000: Data is NotFound',
    });
  }
});

meeting.get('/:meetingId', authorized, async (req, res) => {
  const { meetingId } = req.params;

  try {
    const response = await axios.get(`${ZOOM_API}/meetings/${meetingId}`, {
      headers: {
        Authorization: `Bearer ${res.locals.accessToken}`,
      },
    });

    return res.status(200).json({
      ok: true,
      error: null,
      meeting: response.data,
    });
  } catch (e) {
    console.error(e);
    return res.status(e.response.status).json({
      ok: false,
      error: 'Error: 4000: Data is NotFound',
    });
  }
});

module.exports = meeting;
