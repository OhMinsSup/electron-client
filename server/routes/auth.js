const { Router } = require('express');
const axios = require('axios').default;
const { ZOOM_API, CLIENT_URL } = require('../config/contant');

const auth = Router();

const { ZOOM_REDIRECT_URL, ZOOM_CLIENT_SECRET, ZOOM_CLIENT_ID } = process.env;

auth.post('/logout', (req, res) => {
  req.session.destroy(() => {
    console.log('logout:: 🌕 session destory');
  });

  return res.status(200).json({
    ok: true,
    error: null,
  });
});

auth.post('/refresh', async (req, res) => {
  if (!req.body.refreshToken) {
    return res.status(400).json({
      ok: false,
      error: 'Error 61058: Refresh token is required',
      accessToken: null,
      refreshToken: null,
    });
  }

  const { refreshToken } = req.body;

  try {
    const url = `https://zoom.us/oauth/token?grant_type=refresh_token&refresh_token=${refreshToken}`;
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

    req.session.accessToken = data.access_token;
    req.session.refreshToken = data.refresh_token;

    req.session.save(() => {
      console.log('refresh:: 🌕 session save');
    });

    return res.status(200).json({
      ok: true,
      error: null,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    });
  } catch (e) {
    console.error(e);
    return res.status(e.response.status).json({
      ok: true,
      error: 'Error 57533: Refresh token is not valid',
    });
  }
});

auth.get('/tokens', (req, res) => {
  res.status(200).json({
    ok: true,
    error: null,
    accessToken: req.session.accessToken || null,
    refreshToken: req.session.refreshToken || null,
  });
});

auth.get('/callback/zoom', async (req, res) => {
  const { code } = req.query;

  try {
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

      const userData = await axios.get(`${ZOOM_API}/users/me`, {
        headers: {
          Authorization: `Bearer ${tokenData.data.access_token}`,
        },
      });

      req.session.accessToken = tokenData.data.access_token;
      req.session.refreshToken = tokenData.data.refresh_token;
      req.session.user = userData.data;
      req.session.save(() => {
        console.log('callback/login:: 🌕 session save');
      });
    }

    res.redirect(`${CLIENT_URL}/login`);
  } catch (e) {
    console.error(e);
    res.status(e.response.status).json({
      ok: false,
      error: 'Error: 4000: Data is NotFound',
    });
  }
});

auth.get('/redirect/zoom', (req, res) => {
  req.session.destroy(() => {
    console.log('redirect/zoom destory:: 🌖 session destory');
  });

  const path = `https://zoom.us/oauth/authorize?response_type=code&client_id=${ZOOM_CLIENT_ID}&redirect_uri=${ZOOM_REDIRECT_URL}`;
  res.redirect(path);
});

module.exports = auth;
