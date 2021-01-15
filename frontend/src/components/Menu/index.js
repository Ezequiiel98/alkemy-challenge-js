import React, { useRef, useContext } from 'react';

import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import homeIcon from '../../assets/icons/home-icon.svg';
import addIcon from '../../assets/icons/add-icon.svg';
import closeIcon from '../../assets/icons/close-icon.svg';
import openIcon from '../../assets/icons/menu-icon.svg';

import Button from '../Button';

import styles from './index.module.scss';

function Menu() {
  const menuRef = useRef(null);
  const [dataAuth, setDataAuth] = useContext(AuthContext);

  const handleShowMenu = () => {
    menuRef.current.classList.add(styles.showMenu);
    menuRef.current.classList.remove(styles.hiddenMenu);
  };

  const handleCloseMenu = () => {
    menuRef.current.classList.add(styles.hiddenMenu);
    menuRef.current.classList.remove(styles.showMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setDataAuth({});
  };

  return (
    <div className={styles.containerMenu}>
      <button className={styles.openMenu} type="button" onClick={handleShowMenu}>
        <img src={openIcon} alt="" />
      </button>
      <div className={styles.menu} ref={menuRef}>
        <div className={styles.containerCloseMenu}>
          <button className={styles.closeMenu} type="button" onClick={handleCloseMenu}>
            <img src={closeIcon} alt="close menu" />
          </button>
        </div>
        <div className={styles.containerUsername}>
          <p className={styles.greating}>
            Welcome&nbsp;
            { dataAuth.username }
            !
          </p>
        </div>
        <ul className={styles.menuItems}>
          <li className={styles.menuItem}>
            <Link to="/" className={styles.link}>
              <img src={homeIcon} alt="" />
              {' '}
              Home
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link to="/new" className={styles.link}>
              <img src={addIcon} alt="" />
              {' '}
              Add new
            </Link>
          </li>
        </ul>
        <div className={styles.containerLogout}>
          <Button className={styles.logout} variantStyle="link" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Menu;
