import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../../../context/AuthContext';
import updateIcon from '../../../../assets/icons/update-icon.svg';
import deleteIcon from '../../../../assets/icons/delete-icon.svg';
import Button from '../../../../components/Button';

import styles from './index.module.scss';

const operation = {
  amount: 50,
  type: 'spend',
  date: 'asda',
  description: 'asdasd',
  id: 'asda',
};

function TableOperations() {
  const [dataAuth] = useContext(AuthContext);
  const [operations, setOperations] = useState({});

  useEffect(() => {
    console.log(dataAuth, operations, setOperations);
  }, []);
  return (
    <div className={styles.table}>
      <div className={styles.tableHeadContainer}>
        <p className={styles.tableHead}>Amount</p>
        <p className={styles.tableHead}>Type</p>
        <p className={styles.tableHead}>Description</p>
        <p className={styles.tableHead}>Date</p>
        <p className={styles.tableHead}>Actions</p>
      </div>
      <div className={styles.tableBody}>
        <div className={styles.tableRow} key={operation.id}>
          <p className={styles.tableItem}>
            $
            {operation.amount}
          </p>
          <p className={styles.tableItem}>{operation.type}</p>
          <p className={styles.tableItem}>{operation.description}</p>
          <p className={styles.tableItem}>{operation.description}</p>
          <p className={styles.actions}>
            <Link to={`/update-operation/${operation.id}`} className={styles.buttonUpdate} type="button">
              <img src={updateIcon} alt="" />
            </Link>
            <button className={styles.buttonDelete} type="button">
              <img src={deleteIcon} alt="" />
            </button>
          </p>
        </div>
      </div>
      <Button className={styles.buttonMore} variantStyle="light">See more</Button>
    </div>
  );
}

export default TableOperations;
