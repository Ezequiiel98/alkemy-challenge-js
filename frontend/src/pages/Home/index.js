import React, { useEffect, useState } from 'react';

import { parseDate } from '../../helpers';
import { getOperationsService } from '../../services/operations.service';
import { useValidateToken } from '../../hooks';

import ContainerApp from '../../components/ContainerApp';

import Header from './components/Header';
import styles from './index.module.scss';

function Home() {
  const [dataAuth] = useValidateToken();
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

    getLastOperations();

    return null;
  }, []);

  return (
    <ContainerApp showLoader={isLoading}>
      <Header
        entry={dataMoney.entry || 0}
        spend={dataMoney.spend || 0}
        rest={dataMoney.rest || 0}
      />

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

export default Home;
