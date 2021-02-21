import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar";
import Schedule from "./components/schedule";
import Login from "./components/login";
import { DataProvider } from "./components/contexts/DataContext";

export default function App() {
  return (
    <div>
      <Router>
        <DataProvider>
          <Switch>
            <Route path="/home">
              <Navbar />
              <Schedule />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </DataProvider>
      </Router>
    </div>
  );
}
