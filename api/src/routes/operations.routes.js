const { Router } = require('express');

const { controllerWithTryCatch } = require('../helpers');
/*
const {
  createOperation,
  getOperation,
  updateOperation,
  deleteOperation
} = require('../controllers/operations.controller.js'); */

const router = Router();

router.post('/operation', (req, res) => res.send('post'));

router.get('/', (req, res) => res.send('get operationss'));

router.route('/operation/:id')
  .get((req, res) => res.send('get'))
  .put((req, res) => res.send('put'))
  .delete((req, res) => res.send('delete'));

module.exports = router;
