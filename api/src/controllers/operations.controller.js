const Operations = require('../models/Operations.model');
const User = require('../models/Users.model');

exports.createOperation = async (req, res) => {
  const {
    amount, date, description, type,
  } = req.body;

  // const user = await User.findOne({ where: { id: userId } });

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

exports.updateOperation = async (req, res) => {
  const { id } = req.params;
  const {
    amount, date, description, type,
  } = req.body;

  const newData = {
    amount, date, description, type,
  };

  const operationExist = await Operations.findOne({ where: { id } });

  if (!operationExist) {
    return res.status(404).json({ message: 'Operation not found' });
  }

  await Operations.update(newData, { where: { id } });

  return res.status(200).json({ message: 'Operation updated successfully' });
};

exports.deleteOperation = async (req, res) => {
  const { id } = req.params;

  await Operations.destroy({ where: { id } });

  res.status(200).send('Operation deleted successfully');
};
