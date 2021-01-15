const jwt = require('jsonwebtoken');

const { SECRET_JWT } = require('../config/jwt');
const Users = require('../models/Users.model');
const ValidTokens = require('../models/Valid-tokens.model');

exports.signUp = async (req, res) => {
  const { username, email, password } = req.body;

  await Users.create({
    username, email, password,
  });

  return res.status(201).json({ message: 'User created successfully' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: 'Email and password are required' });
  }

  const user = await Users.findOne({ where: { email } });

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

exports.logout = async (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  await ValidTokens.destroy({ where: { token } });

  return res.status(200).json({ message: 'logout' });
};

exports.validateTokenController = async (req, res) => {
  const { token } = req.params;

  const tokenIsValid = await ValidTokens.findOne({ where: { token } });

  if (!tokenIsValid) return res.status(401).json({ message: 'Invalid token' });

  const tokenDecoded = jwt.verify(token, SECRET_JWT);

  const user = await Users.findOne({
    where: { id: tokenDecoded.id },
    attributes: { exclude: ['id', 'password'] },
  });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json(user);
};
