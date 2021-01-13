const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const { validatePassword } = require('../helpers');
const database = require('../config/database');

const Users = database.define('users', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },

  email: {
    type: Sequelize.STRING(60),
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Enter a valid email',
      },
      notEmpty: {
        msg: 'Email is required',
      },
      notNull: {
        msg: 'Email is required',
      },
    },
    unique: {
      args: true,
      msg: 'This user already exists',
    },
  },

  username: {
    type: Sequelize.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: {
        mgs: 'Username is required',
      },
      notNull: {
        msg: 'Username is required',
      },
    },
  },

  password: {
    type: Sequelize.STRING(60),
    allowNull: false,
    validate: {
      notEmpty: {
        mgs: 'Password is required',
      },
      notNull: {
        msg: 'Password is required',
      },
      validatePassword,
    },
  },
},
{
  hooks: {
    beforeCreate(user) {
      /* eslint-disable no-param-reassign */
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    },
  },
});

// Users.hasMany(Operations);

// custom methods
Users.prototype.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = Users;
