const { Router } = require('express');

const { controllerWithTryCatch } = require('../helpers');

const {
  createOperation,
  getOperations,
  getOperation,
  updateOperation,
  deleteOperation,
} = require('../controllers/operations.controller.js');

const router = Router();

router.post('/operation', controllerWithTryCatch(createOperation));

router.get('/', controllerWithTryCatch(getOperations));

router.route('/operation/:id')
  .get(controllerWithTryCatch(getOperation))
  .put(controllerWithTryCatch(updateOperation))
  .delete(controllerWithTryCatch(deleteOperation));

module.exports = router;
