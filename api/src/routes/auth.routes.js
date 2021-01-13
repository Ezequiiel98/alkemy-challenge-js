const { Router } = require('express');

const { controllerWithTryCatch } = require('../helpers');
const { signUp, login } = require('../controllers/auth.controller');

const router = Router();

router.post('/signup', controllerWithTryCatch(signUp));

router.post('/login', controllerWithTryCatch(login));

router.delete('/logout', (req, res) => res.send('logout'));

module.exports = router;
