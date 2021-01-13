const validatePassword = (password) => {
  const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d*?&]|[^ ])*$/;

  if (password.length < 10) {
    throw new Error('Password must be greater than 10 characters');
  }

  if (!regexPass.test(password)) {
    throw new Error('Password must have at least a capital letter and a number');
  }
};

module.exports = validatePassword;
