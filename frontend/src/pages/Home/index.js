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

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableHead}>Amount</th>
            <th className={styles.tableHead}>Type</th>
            <th className={styles.tableHead}>Description</th>
            <th className={styles.tableHead}>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.tableRow}>
            <td className={styles.tableItem}>$500</td>
            <td className={styles.tableItem}>spend</td>
            <td className={styles.tableItem}>food</td>
            <td className={styles.tableItem}>12/15/12</td>
          </tr>
          <tr className={styles.tableRow}>
            <td className={styles.tableItem}>$500</td>
            <td className={styles.tableItem}>spend</td>
            <td className={styles.tableItem}>food</td>
            <td className={styles.tableItem}>12/15/12</td>
          </tr>
        </tbody>
      </table>
    </ContainerApp>
  );
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Home;
