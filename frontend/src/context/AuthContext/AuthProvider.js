import React, { useState } from 'react';

import PropTypes from 'prop-types';

import AuthContext from './AuthContext';

export default function AuthProvider({ children }) {
  const initialState = {
    token: localStorage.getItem('token') || '',
    username: '',
  };

  const [dataAuth, setData] = useState(initialState);

  const setDataAuth = ({ token, username }) => {
    setData({ token, username });
    localStorage.setItem('token', JSON.stringify(token));
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
