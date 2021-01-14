import React, { useState } from 'react';

import { loginService } from '../../services/auth.service';
import { validateEmail, validatePassword } from '../../helpers';
import Input from '../../components/Input';
import ContainerAuth from '../../components/ContainerAuth';
import Button from '../../components/Button';

import styles from './index.module.scss';

function Login() {
  const [form, setForm] = useState({ email: '', password: '', sending: false });
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });

  const handleChange = ({ target: { name, value } }) => {
    setForm((lastValues) => ({ ...lastValues, [name]: value }));
    setFormErrors((lastValues) => ({ ...lastValues, [name]: '' }));
  };

  const sendLogin = async (data) => {
    setForm((lastForm) => ({ ...lastForm, sending: true }));

    try {
      const res = await loginService(data);
      console.log(res);
    } catch (err) {
      const { path, message } = err.response.data;
      setFormErrors((errors) => ({ ...errors, [path || 'password']: message }));
    }

    setForm((lastForm) => ({ ...lastForm, sending: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;
    const { emailIsValid, emailError } = validateEmail(email);
    const { passwordIsValid, passwordError } = validatePassword(password);

    if (!emailIsValid) {
      setFormErrors((lastErrors) => ({ ...lastErrors, email: emailError }));
    }

    if (!passwordIsValid) {
      setFormErrors((lastErrors) => ({ ...lastErrors, password: passwordError }));
    }

    if (emailIsValid && passwordIsValid) {
      sendLogin({ email, password });
    }
  };

  return (
    <ContainerAuth
      topLink="Sign Up"
      topLinkTo="/sign-up"
      topLinkText="Don't have an account?"
      title="Welcome!"
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type="email"
          label="email"
          id="email"
          name="email"
          error={formErrors.email}
          value={form.email}
          onChange={handleChange}
          required
        />

        <Input
          type="password"
          label="password"
          id="password"
          name="password"
          error={formErrors.password}
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button
          type="submit"
          className={styles.buttonSubmit}
          loading={form.sending}
          disabled={form.sending}
        >
          Enter
        </Button>
      </form>
    </ContainerAuth>
  );
}

export default Login;
