const { default: axios } = require('axios');

const hydrateUser = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next();
  }

  const accessToken = req.headers.authorization.split(' ')[1];
  if (!accessToken) {
    return next();
  }

  try {
    const response = await axios.get('https://api.zoom.us/v2/users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    req.session.user = response.data;
    req.session.save(() => {
      console.log('middleware:: 🌕 session save');
    });
  } catch (e) {
    console.error(e);
  }

  return next();
};

module.exports = hydrateUser;
