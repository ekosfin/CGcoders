import React, { useEffect, useState } from "react";
import { Col, Form, Modal, Row, Button } from "react-bootstrap";
import { useAdminData } from "./contexts/AdminDataContext";

function AdminModal() {
  const { adminModal, handleAdminModal, selectData } = useAdminData();
  /*const [selectData, setSelectData] = useState({
    material: [
      "Pahvi",
      "Metalli",
      "Muovi"
    ],
    day: [
      "Maanantai",
      "Tiistai",
      "Keskiviikko",
      "Torstai",
      "Perjantai",
      "Lauantai",
      "Sunnuntai"
    ],
    driver: [
      "Pekka",
      "Mikko",
      "Kalle",
      "Esko"
    ],
    destination: [
      "Lappeenranta",
      "Kouvola",
      "Tampere"
    ],
    direction: [
      "Meno",
      "Meno-paluu"
    ]
  });*/
  const [data, setData] = useState({
    material: "",
    day: "",
    driver: "",
    destination: "",
    time: "",
    direction: "",
    info: ""
  });

  useEffect(() => {
    if (!adminModal.open) {
      console.log("Clearing admin modal state");
      setData({
        material: "",
        day: "",
        driver: "",
        destination: "",
        time: "",
        direction: "",
        info: ""
      });
    }
  }, [adminModal.open])

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  }


  return (
    <Modal show={adminModal.open} onHide={() => handleAdminModal(false, null)} centered>
      <Modal.Header closeButton>
        {adminModal.mode === "new" ? (
          <Modal.Title>Uuden toimituksen luominen</Modal.Title>
        ) : adminModal.mode === "edit" ? (
          <Modal.Title>Toimituksen muokkaaminen</Modal.Title>
        ) : ""}
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} >
          {/*Material*/}
          <Row style={{ marginBottom: 10 }}>
            <Col sm={3}>
              <p className="admin-form-text">Materiaali</p>
            </Col>
            <Col sm={9}>
              <Form.Control
                as="select"
                name="material"
                value={data.material}
                onChange={handleChange}
                required>
                <option hidden></option>
                {selectData.material !== undefined &&
                  selectData.material.map((materialData, index) => (
                    <option key={index} value={materialData}>{materialData}</option>
                  ))
                }
              </Form.Control>
            </Col>
          </Row>

          {/*Day*/}
          <Row>
            <Col sm={3}>
              <p className="admin-form-text">Viikonpäivä</p>
            </Col>
            <Col sm={9}>
              <Form.Control
                as="select"
                name="day"
                value={data.day}
                onChange={handleChange}
                required>
                <option hidden></option>
                {selectData.day !== undefined &&
                  selectData.day.map((dayData, index) => (
                    <option key={index} value={dayData}>{dayData}</option>
                  ))
                }
              </Form.Control>
            </Col>
          </Row>
          <Row style={{ marginBottom: 8 }}>
            <Col style={{ padding: 0 }}>
              <hr />
            </Col>
          </Row>

          {/*Driver*/}
          <Row style={{ marginBottom: 10 }}>
            <Col sm={3}>
              <p className="admin-form-text">Kuljettaja</p>
            </Col>
            <Col sm={9}>
              <Form.Control
                as="select"
                name="driver"
                value={data.driver}
                onChange={handleChange}
                required>
                <option hidden></option>
                {selectData.driver !== undefined &&
                  selectData.driver.map((driverData, index) => (
                    <option key={index} value={driverData}>{driverData}</option>
                  ))
                }
              </Form.Control>
            </Col>
          </Row>

          {/*Destination*/}
          <Row style={{ marginBottom: 10 }}>
            <Col sm={3}>
              <p className="admin-form-text">Kohde</p>
            </Col>
            <Col sm={9}>
              <Form.Control
                as="select"
                name="destination"
                value={data.destination}
                onChange={handleChange}
                required>
                <option hidden></option>
                {selectData.destination !== undefined &&
                  selectData.destination.map((destinationData, index) => (
                    <option key={index} value={destinationData}>{destinationData}</option>
                  ))
                }
              </Form.Control>
            </Col>
          </Row>

          {/*Time*/}
          <Row style={{ marginBottom: 10 }}>
            <Col sm={3}>
              <p className="admin-form-text">Kellonaika</p>
            </Col>
            <Col sm={9}>
              <Form.Control
                name="time"
                value={data.time}
                onChange={handleChange}
                required>
              </Form.Control>
            </Col>
          </Row>

          {/*Direction*/}
          <Row style={{ marginBottom: 10 }}>
            <Col sm={3}>
              <p className="admin-form-text">Suunta</p>
            </Col>
            <Col sm={9}>
              <Form.Control
                as="select"
                name="direction"
                value={data.direction}
                onChange={handleChange}
                required>
                <option hidden></option>
                {selectData.direction !== undefined &&
                  selectData.direction.map((directionData, index) => (
                    <option key={index} value={directionData}>{directionData}</option>
                  ))
                }
              </Form.Control>
            </Col>
          </Row>

          {/*Info*/}
          <Row style={{ marginBottom: 10 }}>
            <Col sm={3}>
              <p className="admin-form-text">Lisätieto</p>
            </Col>
            <Col sm={9}>
              <Form.Control
                name="info"
                value={data.info}
                onChange={handleChange}>
              </Form.Control>
            </Col>
          </Row>
          <Button className="w-100" type="submit">Lisää toimitus</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AdminModal;