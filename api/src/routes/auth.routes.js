const { Router } = require('express');

const router = Router();

router.post('/signup', (req, res) => res.send('signup'));

router.post('/login', (req, res) => res.send('login'));

router.delete('/logout', (req, res) => res.send('logout'));

module.exports = router;
