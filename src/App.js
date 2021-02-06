import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar, Nav, Button } from "react-bootstrap";

function App() {
    return (
        <div>
            <Navbar className="navbar-container" collapseOnSelect expand="md" variant="dark">
                <Navbar.Brand className="navbar-logo-container">Logo</Navbar.Brand>
                <Navbar.Toggle className="navbar-toggle" aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="navbar-button-container">
                        <Button variant="outline-light">Kirjaudu ulos</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default App;
