const { default: axios } = require('axios');

const hydrateUser = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next();
  }

  const accessToken = req.headers.authorization.split(' ')[1];
  try {
    const response = await axios.get('https://api.zoom.us/v2/users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    res.app.locals.user = response.data;
  } catch (e) {
    console.error(e);
  }

  return next();
};

module.exports = hydrateUser;
