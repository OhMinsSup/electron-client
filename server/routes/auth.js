const { Router } = require('express');
const axios = require('axios').default;

const auth = Router();

const { ZOOM_REDIRECT_URL, ZOOM_CLIENT_SECRET, ZOOM_CLIENT_ID } = process.env;

auth.get('/callback/zoom', async (req, res) => {
  const { code } = req.query;

  if (code) {
    const url = `https://zoom.us/oauth/token?grant_type=authorization_code&code=${code}&redirect_uri=${ZOOM_REDIRECT_URL}`;
    const tokenData = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`,
          ).toString('base64')}`,
        },
      },
    );

    const userData = await axios.get('https://api.zoom.us/v2/users/me', {
      headers: {
        Authorization: `Bearer ${tokenData.data.access_token}`,
      },
    });

    console.log('access_token:: => ', tokenData.data.access_token);
    console.log('user_info:: => ', userData.data);
  }

  res.redirect('http://localhost:4000');
});

auth.get('/redirect/zoom', (req, res) => {
  res.redirect(
    `https://zoom.us/oauth/authorize?response_type=code&client_id=${ZOOM_CLIENT_ID}&redirect_uri=${ZOOM_REDIRECT_URL}`,
  );
});

module.exports = auth;
