import React from 'react';

import { Switch, Route } from 'react-router-dom';

import { AuthProvider } from '../../context/AuthContext';
import Login from '../../pages/Login';

function App() {
  return (
    <Switch>
      <AuthProvider>
        <Route exact path="/login" component={Login} />
      </AuthProvider>
    </Switch>
  );
}

export default App;
