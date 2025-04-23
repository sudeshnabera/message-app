const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('chatdb', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;