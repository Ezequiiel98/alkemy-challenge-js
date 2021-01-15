import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

function Header({ spend, entry, rest }) {
  return (
    <div className={styles.containerHeader}>
      <div className={styles.containerEntry}>
        <h1 className={styles.title}>Entries</h1>
        <h3 className={styles.money}>
          $
          {entry}
        </h3>
      </div>
      <div className={styles.containerSpend}>
        <h1 className={styles.title}>Spends</h1>
        <h3 className={styles.money}>
          $
          {spend}
        </h3>
      </div>
      <div className={styles.containerRest}>
        <h1 className={styles.title}>Rest</h1>
        <h3 className={styles.money}>
          $
          {rest}
        </h3>
      </div>
    </div>
  );
}

Header.propTypes = {
  spend: PropTypes.number.isRequired,
  rest: PropTypes.number.isRequired,
  entry: PropTypes.number.isRequired,
};

export default Header;
