import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, requiredRole, ...rest }) => {
  const token = useSelector((state) => state.login.token);
  const login = useSelector((state) => state.login.loginData?.department_admin);

  // Determine if the user has the required role
  const isAuthorized = requiredRole === "admin" ? !login : login;

  return (
    <Route
      {...rest}
      render={(props) =>
        token && isAuthorized ? (
          <Component {...props} />
        ) : (
          <Redirect to="/app/main/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
