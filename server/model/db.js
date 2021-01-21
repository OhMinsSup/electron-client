const { Sequelize } = require('sequelize');
const pg = require('pg');

pg.defaults.parseInt8 = true; // fixes issue: umbers returning as string.

const { DB_NAME, DB_USERNAME, DB_PASSWORD, NODE_ENV } = process.env;

const options =
  NODE_ENV === 'production'
    ? {
        database: DB_NAME,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        host: process.env.DB_HOST || '',
        dialect: 'postgres',
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
        ssl: true,
      }
    : {
        database: DB_NAME,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        host: 'localhost',
        dialect: 'sqlite',
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
        storage: 'server/db/db.sqlite',
      };

const db = new Sequelize(options);

module.exports = db;
