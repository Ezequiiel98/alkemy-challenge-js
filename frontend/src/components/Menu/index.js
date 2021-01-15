import React from 'react';
import { Link } from 'react-router-dom';

import styles from './index.module.scss';

function Menu() {
  return (
    <div className={styles.containerMenu}>
      <button className={styles.openMenu} type="button">open</button>
      <div className={styles.menu}>
        <div className={styles.containerCloseMenu}>
          <button className={styles.closeMenu} type="button">Close</button>
        </div>
        <div className={styles.containerUser}>
          <p className={styles.greating}>Welcome name!</p>
        </div>
        <ul className={styles.menuItems}>
          <li className={styles.menuItem}>
            <Link to="/">
              Home
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link to="/">
              New
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
