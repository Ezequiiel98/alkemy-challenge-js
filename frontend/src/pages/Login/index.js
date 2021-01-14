import React from 'react';

import Input from '../../components/Input';
import bgLogin from '../../assets/img/login-bg.jpg';

import styles from './index.module.scss';

function Login() {
  return (
    <div className={styles.containerLogin}>
      <div className={styles.containerBg}>
        <img src={bgLogin} alt="" className={styles.bgLogin} />
      </div>
      <div className={styles.containerForm}>
        <form className={styles.form} action="">
          <Input
            type="email"
            label="email"
            id="email"
            name="email"
            error="Pass incorrect"
          />

        </form>
      </div>
    </div>
  );
}

export default Login;
