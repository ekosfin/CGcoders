import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useData } from "../contexts/DataContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { tokenObj } = useData();

  return (
    <Route
      {...rest}
      render={(props) => {
        return tokenObj ? <Component {...props} /> : <Redirect to="/" />;
      }}
    ></Route>
  );
}
