import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useData } from "../contexts/DataContext";

export default function PublicRoute({
  component: Component,
  restricted,
  ...rest
}) {
  const { tokenObj } = useData();

  return (
    <Route
      {...rest}
      render={(props) => {
        return tokenObj && restricted ? (
          <Redirect to="/home" />
        ) : (
          <Component {...props} />
        );
      }}
    ></Route>
  );
}
