import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

function Input({
  label, id, type, name, error, onClick, onChange, value, required,
}) {
  return (
    <>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.containerInput}>
        <input
          className={styles.input}
          type={type}
          id={id}
          onClick={onClick}
          onChange={onChange}
          value={value}
          required={required}
          name={name}
        />
        { error && (
          <div className={styles.containerErrors}>
            <span className={styles.error}>
              {' '}
              { error }
              {' '}
            </span>
          </div>
        ) }
      </div>
    </>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  error: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  required: PropTypes.bool,
};

Input.defaultProps = {
  type: 'text',
  error: null,
  onClick: null,
  onChange: null,
  value: '',
  required: false,
};

export default Input;
