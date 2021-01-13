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

// get all operations
// last = boolean, per_page number, page number
// default url/path?per_page=1&page=0&last=false;
exports.getOperations = async (req, res) => {
  const { per_page: perPage, page, last } = req.query;

  const limit = parseInt(perPage, 10) || 10;
  const indexPage = parseInt(page, 10) || 1;
  const offset = (indexPage - 1) * limit;
  const order = [['id', `${last === 'true' ? 'DESC' : 'ASC'}`]];

  const operations = await Operations.findAll({
    attributes: { exclude: ['userId'] },
    limit,
    offset,
    order,
  });

  res.status(200).json({ page: indexPage + 1, per_page: perPage, operations });
};

// get operation by id
exports.getOperation = async (req, res) => {
  const { id } = req.params;

  const operation = await Operations.findOne({ where: { id } });

  if (!operation) {
    return res.status(404).json({ message: 'Operation not found' });
  }

  return res.status(200).json(operation);
};

// update
exports.updateOperation = async (req, res) => {
  const { id } = req.params;
  const {
    amount, date, description,
  } = req.body;

  const newData = {
    amount, date, description,
  };

  const operationExist = await Operations.findOne({ where: { id } });

  if (!operationExist) {
    return res.status(404).json({ message: 'Operation not found' });
  }

  await Operations.update(newData, { where: { id } });

  return res.status(200).json({ message: 'Operation updated successfully' });
};

// delete operation
exports.deleteOperation = async (req, res) => {
  const { id } = req.params;

  await Operations.destroy({ where: { id } });

  res.status(200).send('Operation deleted successfully');
};
