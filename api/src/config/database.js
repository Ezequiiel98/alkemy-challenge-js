const { Sequelize } = require('sequelize');

const database = new Sequelize('budget_control', 'root', 'root', {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql',
  define: {
    timestamps: false,
  },
});

module.exports = database;
