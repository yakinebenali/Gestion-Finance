
const  Sequelize  = require('sequelize');

const db = new Sequelize('telegram', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = db;
