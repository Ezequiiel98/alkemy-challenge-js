import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

function Button({
  children, type, variantStyle, loading, disabled, className,
}) {
  const style = className ? `${styles[variantStyle]} ${className}` : styles[variantStyle];
  return (
    <button
      className={style}
      type={type === 'submit' ? 'submit' : 'button'}
      disabled={disabled}
    >
      {loading ? <div className={styles.loader} /> : children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  variantStyle: PropTypes.oneOf(['light', 'primary']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  type: 'button',
  variantStyle: 'primary',
  loading: false,
  disabled: false,
  className: null,
};

export default Button;
