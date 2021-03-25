import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/navbar";
import Schedule from "./components/schedule";
import Login from "./components/login";
import { DataProvider } from "./components/contexts/DataContext";
import { AdminDataProvider } from "./components/contexts/AdminDataContext";

export default function App() {
  return (
    <Router>
      <DataProvider>
        <Switch>
          <Route path="/home">
            <AdminDataProvider>
              <NavBar />
              <Schedule />
            </AdminDataProvider>
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </DataProvider>
    </Router>
  );
}
