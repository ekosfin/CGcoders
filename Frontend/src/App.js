import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { DataProvider } from "./components/contexts/DataContext";
import HomeRoute from "./components/routes/HomeRoute";
import LoginRoute from "./components/routes/LoginRoute";
import PublicRoute from "./components/routes/PublicRoute";
import PrivateRoute from "./components/routes/PrivateRoute";

export default function App() {
  return (
    <Router>
      <DataProvider>
        <Switch>
          <PrivateRoute component={HomeRoute} path="/home" exact />
          <PublicRoute component={LoginRoute} path="/" restricted={true} />
        </Switch>
      </DataProvider>
    </Router>
  );
}
