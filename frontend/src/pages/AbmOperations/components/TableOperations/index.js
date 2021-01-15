import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { parseDate } from '../../../../helpers';
import { getOperationsService, deleteOperationService } from '../../../../services/operations.service';
import { AuthContext } from '../../../../context/AuthContext';
import updateIcon from '../../../../assets/icons/update-icon.svg';
import deleteIcon from '../../../../assets/icons/delete-icon.svg';
import Button from '../../../../components/Button';

import styles from './index.module.scss';

function TableOperations({ newOperation }) {
  const [dataAuth] = useContext(AuthContext);
  const [operations, setOperations] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [noMoreOperations, setNoMoreOperations] = useState(false);

  useEffect(() => {
    const getOperations = async () => {
      setButtonLoading(true);
      try {
        const { data } = await getOperationsService({ page, token: dataAuth.token });

        if (data.operations.length > 0) {
          setOperations((op) => ([...op, ...data.operations]));
        } else {
          setNoMoreOperations(true);
        }
      } catch (err) {
        console.log(err);
      }
      setButtonLoading(false);
    };

    getOperations();

    return null;
  }, [page, newOperation]);

  const handleSeeMore = () => {
    setPage((lastPage) => lastPage + 1);
  };

  const handleDeleteOperation = async (id) => {
    try {
      await deleteOperationService(id, dataAuth.token);
      const filterOperation = operations.filter((op) => op.id !== id);
      setOperations(filterOperation);
    } catch {
      console.log('error');
    }
  };

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
        {operations.map(({
          id, type, date, description, amount,
        }) => (
          <div className={styles.tableRow} key={id}>
            <p className={styles.tableItem}>
              $
              {amount}
            </p>
            <p className={styles.tableItem}>{type}</p>
            <p className={styles.tableItem}>{description}</p>
            <p className={styles.tableItem}>{parseDate(date)}</p>
            <p className={styles.actions}>
              <Link to={`/update-operation/${id}`} className={styles.buttonUpdate} type="button">
                <img src={updateIcon} alt="" />
              </Link>
              <button className={styles.buttonDelete} onClick={() => handleDeleteOperation(id)} type="button">
                <img src={deleteIcon} alt="" />
              </button>
            </p>
          </div>
        ))}
      </div>
      { !noMoreOperations && (
      <Button
        onClick={handleSeeMore}
        loading={buttonLoading}
        className={styles.buttonMore}
        variantStyle="light"
      >
        See more
      </Button>
      )}
    </div>
  );
}

TableOperations.propTypes = {
  newOperation: PropTypes.bool.isRequired,
};

export default TableOperations;
