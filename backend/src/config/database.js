const { Sequelize } = require('sequelize');
require("dotenv").config();

const sequelize = new Sequelize(process.env.PG_NAME, process.env.PG_USER, process.env.PG_PASSWORD,{
    host: process.env.PG_HOST,
    dialect: 'postgres',
  });

module.exports = sequelize;