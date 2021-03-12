import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function NavBar() {
  const history = useHistory();

  function handleLogout() {
    //TODO fill fuctionality
    history.push("/");
  }

  return (
    <Navbar
      className="navbar-container"
      collapseOnSelect
      expand="md"
      variant="dark"
    >
      <Navbar.Brand className="navbar-logo-container">Logo</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="navbar-button-container">
          <Button variant="outline-light" onClick={handleLogout}>
            Kirjaudu ulos
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
