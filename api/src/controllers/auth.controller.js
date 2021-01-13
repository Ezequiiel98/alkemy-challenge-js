// const jwt = require('jsonwebtoken');
// const { SECRECT_JWT } = require('../config/jwt');
const User = require('../models/Users.model');

exports.signUp = async (req, res) => {
  const { username, email, password } = req.body;

  await User.create({
    username, email, password,
  });

  return res.status(201).json({ message: 'User created successfully' });
};
