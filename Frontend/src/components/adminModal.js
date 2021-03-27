import React, { useEffect } from "react";
import { Col, Form, Modal, Row, Button } from "react-bootstrap";
import { useAdminData } from "./contexts/AdminDataContext";

function AdminModal(props) {
  const { adminModal, handleAdminModal } = useAdminData();
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
  

  useEffect(() => {
    if (!adminModal.open) {
      console.log("Clearing admin modal state");
      props.setAdminModalDefaultData({
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
    props.setAdminModalDefaultData({ ...props.adminModalDefaultData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(props.adminModalDefaultData);
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
                value={props.adminModalDefaultData.material}
                onChange={handleChange}
                required>
                <option hidden></option>
                {props.selectData.material !== undefined &&
                  props.selectData.material.map((materialData, index) => (
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
                value={props.adminModalDefaultData.day}
                onChange={handleChange}
                required>
                <option hidden></option>
                {props.selectData.day !== undefined &&
                  props.selectData.day.map((dayData, index) => (
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
                value={props.adminModalDefaultData.driver}
                onChange={handleChange}
                required>
                <option hidden></option>
                {props.selectData.driver !== undefined &&
                  props.selectData.driver.map((driverData, index) => (
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
                value={props.adminModalDefaultData.destination}
                onChange={handleChange}
                required>
                <option hidden></option>
                {props.selectData.destination !== undefined &&
                  props.selectData.destination.map((destinationData, index) => (
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
                value={props.adminModalDefaultData.time}
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
                value={props.adminModalDefaultData.direction}
                onChange={handleChange}
                required>
                <option hidden></option>
                {props.selectData.direction !== undefined &&
                  props.selectData.direction.map((directionData, index) => (
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
                value={props.adminModalDefaultData.info}
                onChange={handleChange}>
              </Form.Control>
            </Col>
          </Row>
          {adminModal.mode === "new" ?
          <Button className="w-100" type="submit">Lisää toimitus</Button>
          :
          <Button className="w-100" type="submit">Tallenna muutokset</Button>}
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AdminModal;