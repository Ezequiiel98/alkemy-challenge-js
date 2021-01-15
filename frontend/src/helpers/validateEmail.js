const validateEmail = (email) => {
  const result = { emailError: '', emailIsValid: false };
  const expReg = /^(([^<>()[\]\\.,;:\s@”]+(\.[^<>()[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.trim() === '') {
    result.emailError = 'Email is required';
    result.emailIsValid = false;
    return result;
  }

  if (!expReg.test(email)) {
    result.emailError = 'Invalid email';
    result.emailIsValid = false;
    return result;
  }

  result.emailError = '';
  result.emailIsValid = true;

  return result;
};

export default validateEmail;
