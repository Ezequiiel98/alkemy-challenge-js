const controllerWithTryCatch = (cb) => (
  async (req, res) => {
    try {
      return await cb(req, res);
    } catch (errors) {
      const [error] = errors.errors || [];

      if (error) {
        const { message, path } = error;
        return res.status(400).json({ message, path });
      }
      console.log(errors);
      return res.status(500).json({ message: 'unknow error' });
    }
  });

module.exports = controllerWithTryCatch;
