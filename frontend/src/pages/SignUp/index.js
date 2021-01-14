import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { AuthContext } from '../../context/AuthContext';
import Input from '../../components/Input';
import ContainerAuth from '../../components/ContainerAuth';
import Button from '../../components/Button';

import INPUTS from './contants/inputs';
import styles from './index.module.scss';

function SignUp(props) {
  const [form, setForm] = useState({
    email: '', username: '', password: '', passwordReapeated: '', sending: false,
  });
  const [formErrors, setFormErrors] = useState({
    email: '', username: '', password: '', passwordReapeated: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dataAuth] = useContext(AuthContext);

  useEffect(() => {
    if (dataAuth.token !== '') {
      props.history.push('/');
    }

    setIsLoading(false);
  }, [dataAuth]);

  const handleChange = ({ target: { name, value } }) => {
    setForm((lastValues) => ({ ...lastValues, [name]: value }));
    setFormErrors((lastValues) => ({ ...lastValues, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
