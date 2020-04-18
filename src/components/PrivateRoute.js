import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../helper';

function PrivateRoute({ render: Component, ...rest }) {
  useEffect(() => {
    isAuthenticated(localStorage.token);
  }, []);

  return (
    <Route
      {...rest}
      render={props =>
        localStorage.token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
