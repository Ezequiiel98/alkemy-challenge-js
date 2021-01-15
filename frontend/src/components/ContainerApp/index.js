import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import { validateTokenService } from '../../services/auth.service';
import { AuthContext } from '../../context/AuthContext';
import Loader from '../Loader';
import Menu from '../Menu';

import styles from './index.module.scss';

function ContainerApp({
  children, showLoader, ...props
}) {
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

    return null;
  }, []);

  if (showLoader) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <Menu />
      {children}
    </div>
  );
}

ContainerApp.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  showLoader: PropTypes.bool,
};

ContainerApp.defaultProps = {
  showLoader: false,
};

export default ContainerApp;
