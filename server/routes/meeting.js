const { default: axios } = require('axios');
const queryString = require('query-string');
const { Router } = require('express');

const meeting = Router();

meeting.get('/:meetingId', () => {});

meeting.post('/', () => {});

meeting.put('/:meetingId', () => {});

meeting.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const query = queryString.stringify(req.query);
    const url = `https://api.zoom.us/v2/users/${userId}/meetings?`.concat(
      query || '',
    );
    console.log('userId', userId);
    console.log('query', url);

    const meetings = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${req.session.accessToken}`,
      },
    });

    console.log('response', meeting);

    return res.status(200).json({
      ok: true,
      error: null,
      ...meetings.data,
    });
  } catch (e) {
    return res.status(400).json({
      ok: false,
      error: 'Error: 4000: Data is NotFound',
    });
  }
});

module.exports = meeting;
