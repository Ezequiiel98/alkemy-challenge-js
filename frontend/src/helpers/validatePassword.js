const validatePassword = (password) => {
  const result = { passwordIsValid: false, passwordError: '' };
  const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d*?&]|[^ ])*$/;

  if (password.trim() === '') {
    result.passwordError = 'Password is required';
    return result;
  }

  if (password.trim().length !== password.length) {
    result.passwordError = 'Password cannot have blank spaces';
    return result;
  }

  if (password.trim().length < 8 || password.trim().length > 15) {
    result.passwordError = 'Password must be between 8 and 40';
    return result;
  }

  if (!regexPass.test(password)) {
    result.passwordError = 'Password must have at least a capital letter and a number';
    return result;
  }

  result.passwordError = '';
  result.passwordIsValid = true;

  return result;
};

export default validatePassword;
