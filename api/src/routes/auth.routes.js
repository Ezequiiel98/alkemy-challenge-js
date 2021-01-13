const { Router } = require('express');

const { controllerWithTryCatch } = require('../helpers');
const { signUp } = require('../controllers/auth.controller');

const router = Router();

router.post('/signup', controllerWithTryCatch(signUp));

router.post('/login', (req, res) => res.send('login'));

router.delete('/logout', (req, res) => res.send('logout'));

module.exports = router;
