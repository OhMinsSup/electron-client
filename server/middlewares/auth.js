const axios = require('axios').default;
const { ZOOM_API } = require('../config/contant');

const hydrateUser = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next();
  }

  const accessToken = req.headers.authorization.split(' ')[1];
  if (!accessToken) {
    return next();
  }

  try {
    const response = await axios.get(`${ZOOM_API}/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    res.locals.accessToken = accessToken;
    res.locals.user = response.data;
    
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
