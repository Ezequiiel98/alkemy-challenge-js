import React, { useState } from 'react';

import Input from '../../components/Input';
import ContainerAuth from '../../components/ContainerAuth';
import Button from '../../components/Button';

import styles from './index.module.scss';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [formErrors] = useState({ email: '', password: '' });

  const handleChange = ({ target: { name, value } }) => {
    setForm((lastValues) => ({ ...lastValues, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);
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
        />

        <Input
          type="password"
          label="password"
          id="password"
          name="password"
          error={formErrors.password}
          value={form.password}
          onChange={handleChange}
        />
        <Button type="submit" className={styles.buttonSubmit}>Enter</Button>
      </form>
    </ContainerAuth>
  );
}

export default Login;
