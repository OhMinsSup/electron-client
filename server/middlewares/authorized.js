const authorized = (req, res, next) => {
  if (req.session.user) {
    return next();
  }

  return res.status(401).json({
    ok: false,
    error: 'Error: Unauthorized',
  });
};

module.exports = authorized;
