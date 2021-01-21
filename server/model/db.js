const { Sequelize } = require('sequelize');

const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

const db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  storage: 'server/db/db.sqlite',
});

module.exports = db;
