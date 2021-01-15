import React from 'react';

import { Switch, Route } from 'react-router-dom';

import { AuthProvider } from '../../context/AuthContext';
import Login from '../../pages/Login';
import SignUp from '../../pages/SignUp';

import Home from '../../pages/Home';
import AbmOperations from '../../pages/AbmOperations';
import UpdateOperation from '../../pages/UpdateOperation';

import PrivateRoute from '../PrivateRoute';

function App() {
  return (
    <Switch>
      <AuthProvider>
        <PrivateRoute exact path="/" component={Home} redirectTo="/login" />
        <PrivateRoute exact path="/operations" component={AbmOperations} redirectTo="/login" />
        <PrivateRoute exact path="/update-operation/:id" component={UpdateOperation} redirectTo="/login" />
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
      </AuthProvider>
    </Switch>
  );
}

export default App;
