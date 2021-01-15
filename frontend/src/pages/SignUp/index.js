import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { validatePassword, validateEmail } from '../../helpers';
import { signUpService } from '../../services/auth.service';
import { AuthContext } from '../../context/AuthContext';
import Input from '../../components/Input';
import ContainerAuth from '../../components/ContainerAuth';
import Button from '../../components/Button';

import INPUTS from './contants/inputs';
import styles from './index.module.scss';

function SignUp(props) {
  const [form, setForm] = useState({
    email: '', username: '', password: '', passwordRepeated: '', sending: false,
  });
  const [formErrors, setFormErrors] = useState({
    email: '', username: '', password: '', passwordRepeated: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dataAuth, setDataAuth] = useContext(AuthContext);

  useEffect(() => {
    if (dataAuth.token !== '') {
      props.history.push('/');
    }

    setIsLoading(false);
    return null;
  }, [dataAuth]);

  const sendForm = async (data) => {
    setForm((lastForm) => ({ ...lastForm, sending: true }));

    try {
      await signUpService(data);
      setDataAuth({ ...dataAuth, email: data.email });
      props.history.push('/login');
    } catch (err) {
      const { path, message } = err.response?.data;
      setFormErrors((errors) => ({ ...errors, [path || 'password']: message || 'There was an error try later' }));
    }

    setForm((lastForm) => ({ ...lastForm, sending: false }));
  };

  const handleChange = ({ target: { name, value } }) => {
    setForm((lastValues) => ({ ...lastValues, [name]: value }));
    setFormErrors((lastValues) => ({ ...lastValues, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      password, username, email, passwordRepeated,
    } = form;
    const data = {
      password, username: username.trim(), email, passwordRepeated,
    };
    const { passwordIsValid, passwordError } = validatePassword(password);
    const { emailIsValid, emailError } = validateEmail(email);
    const passwordsEquals = password === passwordRepeated;
    const usernameIsValid = username.length > 4;

    if (!emailIsValid) {
      setFormErrors((lastErrors) => ({ ...lastErrors, email: emailError }));
    }

    if (!passwordIsValid) {
      setFormErrors((lastErrors) => ({ ...lastErrors, password: passwordError }));
    }

    if (!passwordsEquals) {
      setFormErrors((lastErrors) => ({ ...lastErrors, passwordRepeated: 'Passwords must be the same' }));
    }

    if (!usernameIsValid) {
      setFormErrors((lastErrors) => ({ ...lastErrors, username: 'Username must have at least 4 characters' }));
    }

    if (emailIsValid && passwordIsValid && passwordsEquals) {
      sendForm(data);
    }
  };

  return (
    <ContainerAuth
      topLink="Log in"
      topLinkTo="/login"
      topLinkText="Have an account?"
      title="Register"
      showLoader={isLoading}
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        {
          INPUTS.map(({
            key, type, label, id,
          }) => (
            <Input
              key={key}
              type={type}
              label={label}
              id={id}
              name={id}
              error={formErrors[id]}
              value={form[id]}
              onChange={handleChange}
              required
            />
          ))
        }
        <Button
          type="submit"
          className={styles.buttonSubmit}
          loading={form.sending}
          disabled={form.sending}
        >
          Send
        </Button>
      </form>
    </ContainerAuth>
  );
}

SignUp.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignUp;
