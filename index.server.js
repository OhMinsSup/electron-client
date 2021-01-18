require('./server/config/env');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const routes = require('./server');
const hydrateUser = require('./server/middlewares/auth');

const app = express();

const allowedHosts = [];

if (process.env.NODE_ENV === 'development') {
  allowedHosts.push(/^http:\/\/localhost/);
}

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin) return callback(null, false);
      const valid = allowedHosts.some((regext) => regext.test(origin));
      if (!valid) return callback(null, false);
      return callback(null, true);
    },
  }),
);
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET, // 암호화하는 데 쓰일 키
    resave: false, // 세션을 언제나 저장할지 설정함
    saveUninitialized: true, // 세션이 저장되기 전 uninitialized 상태로 미리 만들어 저장
    cookie: {
      maxAge: 31536000,
    },
    store: new FileStore({
      path: 'tmp/.session',
    }),
  }),
);
app.use(hydrateUser);

app.use(routes);

app.get('/', (_req, res) => res.json('ok'));

app.listen(5000, () => {
  console.log('🚀 server running http://localhost:5000');
});
