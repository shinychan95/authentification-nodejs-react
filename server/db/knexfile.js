require('dotenv').config({
  path: '../env-files/development.env',
});

global.Promise = require('bluebird');

// knexfile.js
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.MYSQL_DATABASE_HOST,
      port: process.env.MYSQL_DATABASE_PORT,
      database: process.env.MYSQL_DATABASE_NAME,
      user: process.env.MYSQL_DATABASE_USER,
      password: process.env.MYSQL_DATABASE_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },

  production: {
    client: 'mysql',
    connection: {
      host: process.env.MYSQL_DATABASE_HOST,
      port: process.env.MYSQL_DATABASE_PORT,
      database: process.env.MYSQL_DATABASE_NAME,
      user: process.env.MYSQL_DATABASE_USER,
      password: process.env.MYSQL_DATABASE_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};
