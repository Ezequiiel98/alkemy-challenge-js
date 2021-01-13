const jwt = require('jsonwebtoken');
const { SECRET_JWT } = require('../config/jwt');
const ValidTokens = require('../models/Valid-tokens.model');

const validateToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) return res.status(403).json({ message: 'You must send a token' });

  const tokenIsValid = await ValidTokens.findOne({ where: { token } });

  if (!tokenIsValid) return res.status(401).json({ message: 'Invalid token' });

  try {
    const tokenDecoded = jwt.verify(token, SECRET_JWT);
    req.body.userId = tokenDecoded.id;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = validateToken;
