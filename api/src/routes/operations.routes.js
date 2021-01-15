const { Router } = require('express');

const { controllerWithTryCatch } = require('../helpers');
const { validateToken } = require('../middlewares');

const {
  createOperation,
  getOperations,
  getOperation,
  updateOperation,
  deleteOperation,
  getOperationsByType,
} = require('../controllers/operations.controller.js');

const router = Router();

router.post('/operation', validateToken, controllerWithTryCatch(createOperation));

router.get('/', validateToken, controllerWithTryCatch(getOperations));

router.route('/operation/:id')
  .get(validateToken, controllerWithTryCatch(getOperation))
  .put(validateToken, controllerWithTryCatch(updateOperation))
  .delete(validateToken, controllerWithTryCatch(deleteOperation));

router.get('/spends', validateToken, controllerWithTryCatch((...params) => getOperationsByType(...params, 'spend')));
router.get('/entries', validateToken, controllerWithTryCatch((...params) => getOperationsByType(...params, 'entry')));

module.exports = router;
