import React from 'react';

import { Switch, Route } from 'react-router-dom';

import { AuthProvider } from '../../context/AuthContext';
import Login from '../../pages/Login';

import PrivateRoute from '../PrivateRoute';

const testPrivateRoute = () => <h1>private route</h1>;

function App() {
  return (
    <Switch>
      <AuthProvider>
        <PrivateRoute exact path="/" component={testPrivateRoute} redirectTo="/login" />
        <Route exact path="/login" component={Login} />
      </AuthProvider>
    </Switch>
  );
}

export default App;
