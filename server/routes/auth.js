const { Router } = require('express');
const axios = require('axios').default;

const auth = Router();

const { ZOOM_REDIRECT_URL, ZOOM_CLIENT_SECRET, ZOOM_CLIENT_ID } = process.env;

auth.get('/refresh', async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];

  const url = `https://zoom.us/oauth/token?grant_type=refresh_token&refresh_token=${token}`;
  const response = await axios.post(
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

  const { data } = response;

  res.app.locals.accesToken = data.access_token;
  res.app.locals.refreshToken = data.refresh_token;

  res.status(200).json({
    ok: true,
    accesToken: data.access_token,
    refreshToken: data.refresh_token,
  });
});

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

    res.app.locals.accesToken = tokenData.data.access_token;
    res.app.locals.refreshToken = tokenData.data.refresh_token;
    res.app.locals.user = userData.data;
    console.info('access_token:: => ', tokenData.data.access_token);
    console.info('refresh_token:: => ', tokenData.data.refresh_token);
    console.info('user_info:: => ', userData.data);
  }

  res.redirect('http://localhost:4000');
});

auth.get('/redirect/zoom', (req, res) => {
  res.redirect(
    `https://zoom.us/oauth/authorize?response_type=code&client_id=${ZOOM_CLIENT_ID}&redirect_uri=${ZOOM_REDIRECT_URL}`,
  );
});

module.exports = auth;
