import React from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';
import Button from '../Button';

import styles from './index.module.scss';

function FormOperations({
  data, errors, updated, onChange, onSubmit,
}) {
  return (
    <div className={styles.containerForm}>
      <form className="form" onSubmit={onSubmit}>
        <Input
          label="amount"
          id="amount"
          name="amount"
          type="number"
          value={data.amount}
          error={errors.amount}
          onChange={onChange}
          required
        />
        <div className={styles.containerSelect}>
          <span className={styles.fakeLabel}>Type</span>
          <select
            name="type"
            value={data.type}
            className={styles.select}
            disabled={updated}
            onChange={onChange}
          >
            <option value="entry">Entry</option>
            <option value="spend">Spend</option>
          </select>
        </div>
        <Input
          label="description"
          id="description"
          name="description"
          type="text"
          value={data.description}
          error={errors.description}
          onChange={onChange}
          required
        />
        <Input
          label="date"
          id="date"
          name="date"
          type="date"
          onChange={onChange}
          value={data.date}
          required
        />
        <Button loading={data.sending} type="submit">Create</Button>
      </form>
    </div>
  );
}

FormOperations.propTypes = {
  errors: PropTypes.shape({
    amount: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,

  data: PropTypes.shape({
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['spend', 'entry', '']).isRequired,
    sending: PropTypes.bool.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  updated: PropTypes.bool,
};

FormOperations.defaultProps = {
  updated: false,
};

export default FormOperations;
