import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from "react";
import { Navbar, Nav, Button, Container, Row, Col } from "react-bootstrap";

function App() {

    const [data, setData] = useState([{
        materialName: "Metalli",
        data: [[], [{dayItem: "A12", dayInfo: ""}], [{dayItem: "A12", dayInfo: "Tämä on lisätietoa"}, {dayItem: "A12", dayInfo: ""}], [], [{dayItem: "A12", dayInfo: "Tämä on lisätietoa"}], [{dayItem: "A12", dayInfo: "Tämä on lisätietoa"}]]
    },
    {
        materialName: "Lasi",
        data: [[{dayItem: "A12", dayInfo: ""}], [], [{dayItem: "A12", dayInfo: ""}], [], [{dayItem: "A12", dayInfo: ""}], []]
    },
    {
        materialName: "Pahvi",
        data: [[{dayItem: "A12", dayInfo: "Tämä on lisätietoa"}], [{dayItem: "A12", dayInfo: ""}], [], [], [{dayItem: "A12", dayInfo: ""}], [{dayItem: "A12", dayInfo: "Tämä on lisätietoa"}]]
    }])

    return (
        <div>
            <Navbar className="navbar-container" collapseOnSelect expand="md" variant="dark">
                <Navbar.Brand className="navbar-logo-container">Logo</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="navbar-button-container">
                        <Button variant="outline-light">Kirjaudu ulos</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Container className="grid-container" fluid>
                <Row>
                    <Col className="grid-material"></Col>
                    <Col className="grid-weekday-large">Maanantai</Col>
                    <Col className="grid-weekday-large">Tiistai</Col>
                    <Col className="grid-weekday-large">Keskiviikko</Col>
                    <Col className="grid-weekday-large">Torstai</Col>
                    <Col className="grid-weekday-large">Perjantai</Col>
                    <Col className="grid-weekday-large">Lauantai</Col>

                    <Col className="grid-weekday-small">Ma</Col>
                    <Col className="grid-weekday-small">Ti</Col>
                    <Col className="grid-weekday-small">Ke</Col>
                    <Col className="grid-weekday-small">To</Col>
                    <Col className="grid-weekday-small">Pe</Col>
                    <Col className="grid-weekday-small">La</Col>
                </Row>
            
                {data.map((material, index1) => (
                    <Row className="" key={index1}>
                        <Col style={{ "paddingLeft": 0, "paddingRight": 0}} className="grid-material" >{material.materialName}</Col>
                        {material.data.map((dataItem, index2) => (
                            <Col style={{ "paddingLeft": 0, "paddingRight": 0}} className="grid-item-container" key={index2}>
                                {dataItem.map((dayData, index3) => (
                                    <div className="grid-item" key={index3}>
                                        {dayData.dayInfo.length > 0 ?
                                        <div>
                                            <div className="grid-text-bold">
                                                {dayData.dayItem}
                                            </div>
                                            <div className="grid-info">
                                                {dayData.dayInfo}
                                            </div>
                                        </div>
                                        :
                                        <div>
                                            <div className="grid-text-normal">
                                                {dayData.dayItem}
                                            </div>
                                        </div>}
                                    </div>
                                ))}
                            </Col>
                        ))}
                    </Row>
                ))}
            </Container>
        </div>


    );
}

export default App;
