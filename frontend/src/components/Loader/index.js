import React from 'react';

import styles from './index.module.scss';

export default function Loader() {
  return (
    <div className={styles.container}>
      <div className={styles.loader} />
    </div>
  );
}
