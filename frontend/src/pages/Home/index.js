import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { validateTokenService } from '../../services/auth.service';
import { AuthContext } from '../../context/AuthContext';
import ContainerApp from '../../components/ContainerApp';

import Header from './components/Header';
import styles from './index.module.scss';

function Home(props) {
  const [dataAuth, setDataAuth] = useContext(AuthContext);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const { data: { username, email } } = await validateTokenService(dataAuth.token);
        console.log(dataAuth.token);
        setDataAuth({ ...dataAuth, username, email });
      } catch {
        localStorage.removeItem('token');
        setDataAuth({ });
        props.history.push('/login');
      }
    };
    validateToken();
  }, []);

  return (
    <ContainerApp>
      <Header spend={5000} entry={1233} rest={1203} />

      <div className={styles.table}>
        <div className={styles.tableHeadContainer}>
          <p className={styles.tableHead}>Amount</p>
          <p className={styles.tableHead}>Type</p>
          <p className={styles.tableHead}>Description</p>
          <p className={styles.tableHead}>Date</p>
        </div>
        <div className={styles.tableBody}>
          <div className={styles.tableRow}>
            <p className={styles.tableItem}>$500</p>
            <p className={styles.tableItem}>spend</p>
            <p className={styles.tableItem}>food</p>
            <p className={styles.tableItem}>12/15/12</p>
          </div>
          <div className={styles.tableRow}>
            <p className={styles.tableItem}>$500</p>
            <p className={styles.tableItem}>spend</p>
            <p className={styles.tableItem}>food</p>
            <p className={styles.tableItem}>12/15/12</p>
          </div>
        </div>
      </div>
    </ContainerApp>
  );
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Home;
