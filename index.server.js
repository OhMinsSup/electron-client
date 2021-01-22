/* eslint-disable no-unused-expressions */
require('./server/config/env');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const FileStore = require('session-file-store')(session);
const fs = require('fs');

const db = require('./server/model/db');
const routes = require('./server');
const hydrateUser = require('./server/middlewares/auth');

const port = process.env.PORT || 5000;

const app = express();

const allowedHosts = [/https:\/\/zoom-sdk.netlify.app/];

if (process.env.NODE_ENV === 'development') {
  allowedHosts.push(/^http:\/\/localhost/);
}

// tmp dir create
try {
  fs.accessSync('tmp');
} catch (error) {
  fs.mkdirSync('tmp');
}

// upload dir create
try {
  fs.accessSync('tmp/upload');
} catch (error) {
  fs.mkdirSync('tmp/upload');
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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: 'tmp/upload',
  }),
);
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET, // 암호화하는 데 쓰일 키
    resave: false, // 세션을 언제나 저장할지 설정함
    saveUninitialized: true, // 세션이 저장되기 전 uninitialized 상태로 미리 만들어 저장
    cookie: {
      maxAge: 31536000,
      secure: process.env.NODE_ENV === 'production',
    },
    store: new FileStore({
      path: 'tmp/.session',
    }),
  }),
);
app.use(hydrateUser);

app.get('/', (_req, res) => res.status(200).json('ok'));

app.use(routes);

db.authenticate().then(
  () => {
    db.sync();
    console.log('🚀  DB Connection has been established');
  },
  (err) => {
    console.error('🚒  Unable to connect to the DB:', err);
  },
);

app.listen(port, () => {
  console.log('🚀 server running http://localhost:5000');
});
