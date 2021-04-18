import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAdminData } from "./contexts/AdminDataContext";
import { useData } from "./contexts/DataContext";
import Logo from "../logoWhiteFont.svg";
import { GoogleLogout } from "react-google-login";

export default function NavBar() {
  const history = useHistory();
  const { handleAdminModal } = useAdminData();
  const { userRights, REACT_APP_CLIENT_ID, setTokenObj } = useData();

  function handleLogout() {
    setTokenObj(null);
    history.push("/");
  }

  return (
    <Navbar
      className="navbar-container"
      collapseOnSelect
      expand="md"
      variant="dark"
    >
      <Navbar.Brand className="navbar-logo-container">
        <img alt="remeo-logo" src={Logo}/>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="navbar-button-container">
          {userRights === "admin" ? (
            <Button
              style={{ margin: 5 }}
              variant="outline-light"
              onClick={() => handleAdminModal(true, "new")}
            >
              Uusi toimitus
            </Button>
          ) : (
            ""
          )}
          <GoogleLogout
            clientId={REACT_APP_CLIENT_ID}
            onLogoutSuccess={handleLogout}
            render={(renderProps) => (
              <Button
                onClick={renderProps.onClick}
                style={{ margin: 5 }}
                variant="outline-light"
              >
                Kirjaudu ulos
              </Button>
            )}
          />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
