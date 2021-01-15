import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

// redirecTo is the path to redirect if the user doesnt have permissions.
export default function PrivateRoute({
  component: Component, redirectTo, ...rest
}) {
  const [{ token }] = useContext(AuthContext);
  const hasPermissions = Boolean(token);
  console.log(hasPermissions, token);
  return (
    <Route
      {...rest}
      render={(props) => (hasPermissions ? (
        <Component {...props} />
      ) : (
        <Redirect to={redirectTo} />
      ))}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  redirectTo: PropTypes.string.isRequired,
};
