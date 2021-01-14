import React from 'react';
import { Link } from 'react-router-dom';

import Input from '../../components/Input';
import ContainerAuth from '../../components/ContainerAuth';
import Button from '../../components/Button';
import bgLogin from '../../assets/img/login-bg.jpg';

import styles from './index.module.scss';

function Login() {
  return (
    <ContainerAuth title="Welcome!">
      <form className={styles.form} action="">
        <Input
          type="email"
          label="email"
          id="email"
          name="email"
          error="Pass incorrect"
        />

        <Input
          type="password"
          label="password"
          id="password"
          name="password"
          error="Pass incorrect"
        />
        <Button type="submit" className={styles.buttonSubmit}>Enter</Button>
      </form>
    </ContainerAuth>
  );
}

export default Login;
