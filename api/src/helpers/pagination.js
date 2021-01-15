const pagination = ({ perPage = 10, page = 1, last }) => {
  const limit = parseInt(perPage, 10) || 10;
  const indexPage = parseInt(page, 10) || 1;
  const offset = (indexPage - 1) * limit;
  const order = [['id', `${last === 'true' ? 'DESC' : 'ASC'}`]];

  return {
    limit, indexPage: indexPage + 1, offset, order,
  };
};

module.exports = pagination;
