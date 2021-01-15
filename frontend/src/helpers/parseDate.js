const parseDate = (d) => {
  const date = new Date(d);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth();

  return `${day}/${month}/${year}`;
};

export default parseDate;
