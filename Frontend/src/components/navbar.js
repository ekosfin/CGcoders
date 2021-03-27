import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAdminData } from "./contexts/AdminDataContext";
import { useData } from "./contexts/DataContext";

export default function NavBar() {
  const history = useHistory();
  const { handleAdminModal } = useAdminData();
  const { userRights } = useData();

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
          {userRights === "admin" ?
            <Button style={{ margin: 5 }} variant="outline-light" onClick={() => handleAdminModal(true, "new")}>
              Uusi toimitus
            </Button>
            : ""}
          <Button style={{ margin: 5 }} variant="outline-light" onClick={handleLogout}>
            Kirjaudu ulos
            </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
