const { Router } = require('express');

const { controllerWithTryCatch } = require('../helpers');
const {
  signUp, login, logout, validateTokenController,
} = require('../controllers/auth.controller');

const router = Router();

router.post('/signup', controllerWithTryCatch(signUp));

router.post('/login', controllerWithTryCatch(login));

router.delete('/logout/:token', controllerWithTryCatch(logout));

router.get('/validate-token/:token', controllerWithTryCatch(validateTokenController));

module.exports = router;

