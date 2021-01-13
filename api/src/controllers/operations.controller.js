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

exports.getOperation = async (req, res) => {
  const { id } = req.params;

  const operation = await Operations.findOne({ where: { id } });

  if (!operation) {
    return res.status(404).json({ message: 'Operation not found' });
  }

  return res.status(200).json(operation);
};

exports.updateOperation = async (req, res) => res.send('put');
exports.deleteOperation = async (req, res) => res.send('delete');
