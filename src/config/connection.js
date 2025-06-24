const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    host: 'localhost',
    database: 'store',
    dialect: 'mysql',
    username: 'root',
    password: 'root',
    port: 3306
});

module.exports = sequelize;