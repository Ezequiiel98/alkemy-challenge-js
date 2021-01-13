const Operations = require('../models/Operations.model');

exports.createOperation = async (req, res) => {
  const {
    amount, date, description, type,
  } = req.body;

  await Operations.create({
    amount, date, description, type,
  });

  return res.status(201).json({ message: 'Operation created successfully' });
};

exports.getOperations = async (req, res) => res.send('get operations');
exports.getOperation = async (req, res) => res.send('get');
exports.updateOperation = async (req, res) => res.send('put');
exports.deleteOperation = async (req, res) => res.send('delete');
