const { default: axios } = require('axios');
const queryString = require('query-string');
const { Router } = require('express');

const meeting = Router();

meeting.get('/:userId', async (req, res) => {
  const { authorization } = req.headers;
  const accessToken = authorization.split(' ')[1];
  if (!accessToken) {
    return res.status(401).json({
      ok: false,
      error: 'Error 7070: Unauthorized',
    });
  }

  try {
    const { userId } = req.params;
    const query = queryString.stringify(req.query);
    console.log(query, userId);
    const url = `https://api.zoom.us/v2/users/${userId}/meetings?`.concat(
      query || '',
    );
    console.log(url);
    const meetings = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

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
