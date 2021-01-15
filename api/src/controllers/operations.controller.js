const Operations = require('../models/Operations.model');
const { pagination } = require('../helpers');

exports.createOperation = async (req, res) => {
  const {
    amount, date, description, type, userId,
  } = req.body;

  await Operations.create({
    amount, date, description, type, userId,
  });

  return res.status(201).json({ message: 'Operation created successfully' });
};

// get all operations
// last = boolean, per_page number, page number
// default url/path?per_page=1&page=0&last=false;
exports.getOperations = async (req, res) => {
  const { per_page: perPage, page, last } = req.query;
  const { userId } = req.body;
  const {
    limit, indexPage, offset, order,
  } = pagination({ perPage, last, page });
  const sumAmountOperations = {
    spend: 0,
    entry: 0,
  };

  const operations = await Operations.findAll({
    attributes: { exclude: ['userId'] },
    where: { userId },
    limit,
    offset,
    order,
  });

  const allOperations = await Operations.findAll({ where: { userId } });

  allOperations.forEach((operation) => {
    sumAmountOperations[operation.type] += parseInt(operation.amount, 10);
  });

  res.status(200).json({
    money: { ...sumAmountOperations, rest: sumAmountOperations.entry - sumAmountOperations.spend },
    page: indexPage,
    per_page: limit,
    operations,
  });
};
