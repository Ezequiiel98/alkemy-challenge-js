const { Router } = require('express');

const { controllerWithTryCatch } = require('../helpers');
const { signUp, login, logout } = require('../controllers/auth.controller');

const router = Router();

router.post('/signup', controllerWithTryCatch(signUp));

router.post('/login', controllerWithTryCatch(login));

router.delete('/logout/:token', controllerWithTryCatch(logout));

module.exports = router;
