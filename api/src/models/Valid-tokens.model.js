const Sequelize = require('sequelize');

const database = require('../config/database');

const ValidTokens = database.define('valid_tokens', {
  token: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        mgs: 'Token is required',
      },
    },
  },
});

module.exports = ValidTokens;
