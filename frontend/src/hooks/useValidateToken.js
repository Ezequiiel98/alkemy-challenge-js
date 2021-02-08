import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { validateTokenService } from '../services/auth.service';
import { AuthContext } from '../context/AuthContext';

function useValidateToken() {
  const [dataAuth, setDataAuth] = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const { data: { username, email } } = await validateTokenService(dataAuth.token);
        setDataAuth({ ...dataAuth, username, email });
      } catch {
        localStorage.removeItem('token');
        setDataAuth({ });
        history.push('/login');
      }
    };

    validateToken();
    return null;
  }, []);

  return [dataAuth];
}

export default useValidateToken;
