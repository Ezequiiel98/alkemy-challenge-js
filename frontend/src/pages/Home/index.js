import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { parseDate } from '../../helpers';
import { validateTokenService } from '../../services/auth.service';
import { getOperationsService } from '../../services/operations.service';
import { AuthContext } from '../../context/AuthContext';
import ContainerApp from '../../components/ContainerApp';

import Header from './components/Header';
import styles from './index.module.scss';

function Home(props) {
  const [dataAuth, setDataAuth] = useContext(AuthContext);
  const [operations, setOperations] = useState([]);
  const [dataMoney, setDataMoney] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getLastOperations = async () => {
      try {
        const res = await getOperationsService({ last: true, token: dataAuth.token });
        setOperations(res.data.operations);
        setDataMoney(res.data.money);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    const validateToken = async () => {
      try {
        const { data: { username, email } } = await validateTokenService(dataAuth.token);
        setDataAuth({ ...dataAuth, username, email });
      } catch {
        localStorage.removeItem('token');
        setDataAuth({ });
        props.history.push('/login');
      }
    };

    validateToken();
    getLastOperations();

    return null;
  }, []);

  return (
    <ContainerApp showLoader={isLoading}>
      <Header {...dataMoney} />

      <div className={styles.table}>
        <div className={styles.tableHeadContainer}>
          <p className={styles.tableHead}>Amount</p>
          <p className={styles.tableHead}>Type</p>
          <p className={styles.tableHead}>Description</p>
          <p className={styles.tableHead}>Date</p>
        </div>
        <div className={styles.tableBody}>
          {operations.map((operation) => (
            <div className={styles.tableRow} key={operation.id}>
              <p className={styles.tableItem}>
                $
                {operation.amount}
              </p>
              <p className={styles.tableItem}>{operation.type}</p>
              <p className={styles.tableItem}>{operation.description}</p>
              <p className={styles.tableItem}>{parseDate(operation.date)}</p>
            </div>
          ))}
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
