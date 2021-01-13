const jwt = require('jsonwebtoken');

const { SECRET_JWT } = require('../config/jwt');
const User = require('../models/Users.model');
const ValidTokens = require('../models/Valid-tokens.model');

exports.signUp = async (req, res) => {
  const { username, email, password } = req.body;

  await User.create({
    username, email, password,
  });

  return res.status(201).json({ message: 'User created successfully' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: 'Email and password are required' });
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: 'The password or email is wrong' });
  }

  if (!user.verifyPassword(password)) {
    return res.status(401).json({ message: 'The password or email is wrong' });
  }

  const token = jwt.sign({ id: user.id }, SECRET_JWT);

  await ValidTokens.create({ token });

  return res.status(200).json({ username: user.username, email, token });
};
