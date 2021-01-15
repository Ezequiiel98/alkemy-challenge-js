const Sequelize = require('sequelize');
const database = require('../config/database');

const Operations = database.define('operations', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },

  amount: {
    type: Sequelize.DECIMAL(11),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Amount is required',
      },
      notNull: {
        msg: 'Amount is required',
      },
      isDecimal: {
        msg: 'Amount must be a number',
      },
    },
  },

  description: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Description is required',
      },
      notNull: {
        msg: 'Description is required',
      },
    },
  },

  type: {
    type: Sequelize.STRING(6),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Type is required',
      },
      notNull: {
        msg: 'Type is required',
      },
      isIn: {
        args: [['spend', 'entry']],
        msg: 'Must be spend or entry',
      },
    },
  },

  date: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Date is required',
      },
      notNull: {
        msg: 'Date is required',
      },
      isDate: {
        msg: 'Date must be a date',
      },
    },
  },
});

module.exports = Operations;
