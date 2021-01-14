const { Router } = require('express');

const user = Router();

user.get('/', (req, res) => {
  console.info('app locals refresh_token:: => ', res.app.locals.refreshToken);
  console.info('app locals access_token:: => ', res.app.locals.accesToken);
  console.info('app locals user_info:: => ', res.app.locals.user);

  res.status(200).json({
    user: res.app.locals.user || null,
    accesToken: res.app.locals.accesToken || null,
    refreshToken: res.app.locals.refreshToken || null,
  });
});

module.exports = user;
