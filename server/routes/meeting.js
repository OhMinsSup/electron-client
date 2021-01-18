const { default: axios } = require('axios');
const queryString = require('query-string');
const { Router } = require('express');

const meeting = Router();

meeting.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const query = queryString.stringify(req.query);
    const url = `https://api.zoom.us/v2/users/${userId}/meetings?`.concat(
      query || '',
    );

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${req.session.accessToken}`,
      },
    });

    return res.status(200).json({
      ok: true,
      error: null,
      ...response.data,
    });
  } catch (e) {
    console.error(e);
    return res.status(400).json({
      ok: false,
      error: 'Error: 4000: Data is NotFound',
    });
  }
});

meeting.post('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const response = await axios.post(
      `https://api.zoom.us/v2/users/${userId}/meetings`,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${req.session.accessToken}`,
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
    return res.status(400).json({
      ok: false,
      error: 'Error: 4000: Data is NotFound',
    });
  }
});

meeting.get('/info/:meetingId', async (req, res) => {
  try {
    const { meetingId } = req.params;

    const response = await axios.get(
      `https://api.zoom.us/v2/meetings/${meetingId}`,
      {
        headers: {
          Authorization: `Bearer ${req.session.accessToken}`,
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
    return res.status(400).json({
      ok: false,
      error: 'Error: 4000: Data is NotFound',
    });
  }
});

module.exports = meeting;
