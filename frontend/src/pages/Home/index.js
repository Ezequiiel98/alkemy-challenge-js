import React from 'react';

import Menu from '../../components/Menu';

import styles from './index.module.scss';

function Home() {
  return (
    <div className={styles.containerHome}>
      <Menu />
    </div>
  );
}

export default Home;
