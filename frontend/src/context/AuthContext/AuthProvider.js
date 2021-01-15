import React, { useState } from 'react';

import PropTypes from 'prop-types';

import AuthContext from './AuthContext';

export default function AuthProvider({ children }) {
  const initialState = {
    token: JSON.parse(localStorage.getItem('token')) || '',
    email: '',
    username: '',
  };

  const [dataAuth, setData] = useState(initialState);

  const setDataAuth = ({ token = '', username = '', email = '' }) => {
    setData({ token, username, email });

    if (token !== '') {
      localStorage.setItem('token', JSON.stringify(token));
    }
  };

  return (
    <AuthContext.Provider value={[dataAuth, setDataAuth]}>
      { children }
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
