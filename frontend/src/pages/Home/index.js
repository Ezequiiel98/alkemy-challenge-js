import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { validateTokenService } from '../../services/auth.service';
import { AuthContext } from '../../context/AuthContext';
import ContainerApp from '../../components/ContainerApp';

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
      <h1 className={styles.pepe}>Home</h1>
    </ContainerApp>
  );
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Home;
