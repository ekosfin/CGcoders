import React, { useEffect, useState } from "react";
import { Col, Form, Modal, Row, Button, Spinner, Alert } from "react-bootstrap";
import { useAdminData } from "./contexts/AdminDataContext";
import { useData } from "./contexts/DataContext";

function AdminModal(props) {
  const { adminModal, handleAdminModal } = useAdminData();
  const {
    data,
    setData,
    idNum,
    setIdNum,
    sendEdits,
    dataContextLoading,
    setDataContextLoading,
  } = useData();
  const [adminModalOriginalData, setAdminModalOriginalData] = useState({
    material: "",
    day: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (adminModal.open) {
      setAdminModalOriginalData({
        material: props.adminModalData.material,
        day: props.adminModalData.day,
      });
    }
    if (!adminModal.open) {
      props.setAdminModalData({
        material: "",
        day: "",
        driver: "",
        destination: "",
        time: "",
        direction: "",
        info: "",
      });
      setError("");
    }
  }, [adminModal.open]);

  const handleChange = (e) => {
    props.setAdminModalData({
      ...props.adminModalData,
      [e.target.name]: e.target.value,
    });
  };

  const addToEdits = (edits, add) => {
    if (add !== undefined) {
      edits.push(add);
    }
    return edits;
  };

  const sendDataAPI = async (edits, localData) => {
    setLoading(true);
    setDataContextLoading(true);
    let result = await sendEdits(edits);
    if (result) {
      console.log("Success!");
      setData(localData);
      handleAdminModal(false, null);
    } else {
      if (adminModal.mode === "new") {
        setError("Tietojen tallentaminen epäonnistui! Yritä uudelleen.");
      } else if (adminModal.mode === "edit") {
        setError("Tietojen muokkaaminen epäonnistui! Yritä uudelleen.");
      } else if (adminModal.mode === "remove") {
        setError("Tietojen poistaminen epäonnistui! Yritä uudelleen.");
      }
    }
    setLoading(false);
    setDataContextLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    let result,
      edits = [],
      dataList;
    dataList = JSON.parse(JSON.stringify(data));
    if (adminModal.mode === "new") {
      result = addDelivery(dataList, idNum);
      edits = addToEdits(edits, result.edits);
    } else if (adminModal.mode === "edit") {
      result = removeDelivery(dataList);
      edits = addToEdits(edits, result.edits);

      result = addDelivery(result.dataList, props.adminModalData.idNum);
      edits = addToEdits(edits, result.edits);
    } else if (adminModal.mode === "remove") {
      result = removeDelivery(dataList);
      edits = addToEdits(edits, result.edits);
    }
    if (dataContextLoading) {
      setError("Tietoja noudetaan odota hetki ja yritä uudelleen");
    } else {
      sendDataAPI(edits, result.dataList);
    }
  };

  const addDelivery = (dataList, idNumArg) => {
    let dayList = [
      "Maanantai",
      "Tiistai",
      "Keskiviikko",
      "Torstai",
      "Perjantai",
      "Lauantai",
      "Sunnuntai",
    ];
    let twoWay = props.adminModalData.direction === "Meno-paluu" ? true : false;
    let driverColor = "#FFFFFF";

    data.drivers.forEach((element) => {
      if (props.adminModalData.driver === element.driver) {
        driverColor = element.color;
      }
    });

    let deliveryData = {
      color: driverColor,
      day: props.adminModalData.day,
      dayInfo: props.adminModalData.info,
      dayItem:
        props.adminModalData.driver +
        " " +
        props.adminModalData.destination +
        " " +
        props.adminModalData.time,
      driver: props.adminModalData.driver,
      destination: props.adminModalData.destination,
      time: props.adminModalData.time,
      idNum: idNumArg,
      material: props.adminModalData.material,
      twoWay: twoWay,
    };
    let edits = "";
    setIdNum(idNum + 1);
    if (dataList.schedule !== undefined && data.schedule.length > 0) {
      dataList.schedule = dataList.schedule.map((material) => {
        if (material.materialName === props.adminModalData.material) {
          let dayNum = 0;
          material.data = material.data.map((dayItem) => {
            if (
              dayNum ===
              dayList.findIndex((day) => day === props.adminModalData.day)
            ) {
              dayItem.push(deliveryData);
              edits = {
                materialName: props.adminModalData.material,
                day: props.adminModalData.day,
                data: dayItem,
              };
            }
            dayNum++;
            return dayItem;
          });
        }
        return material;
      });
    }
    return { dataList: dataList, edits: edits };
  };

  const removeDelivery = (dataList) => {
    let edits;
    if (dataList.schedule !== undefined && data.schedule.length > 0) {
      dataList.schedule = dataList.schedule.map((material) => {
        material.data = material.data.map((dayItem) => {
          let removed = false;
          dayItem = dayItem.filter((deliveryItem) => {
            if (deliveryItem.idNum === props.adminModalData.idNum) {
              removed = true;
            }
            return deliveryItem.idNum !== props.adminModalData.idNum;
          });

          if (removed) {
            edits = {
              materialName: adminModalOriginalData.material,
              day: adminModalOriginalData.day,
              data: dayItem,
            };
          }
          return dayItem;
        });
        return material;
      });
    }
    return { dataList: dataList, edits: edits };
  };

  return (
    <Modal
      show={adminModal.open}
      onHide={() => handleAdminModal(false, null)}
      centered
    >
      {error && <Alert variant="warning">{error}</Alert>}
      {loading && (
        <div>
          <div className="admin-modal-loading-dark"></div>
          <div className="admin-modal-loading">
            <Spinner variant="primary" animation="border" />
          </div>
        </div>
      )}
      <Modal.Header closeButton>
        {adminModal.mode === "new" ? (
          <Modal.Title>Uuden toimituksen luominen</Modal.Title>
        ) : adminModal.mode === "edit" ? (
          <Modal.Title>Toimituksen muokkaaminen</Modal.Title>
        ) : adminModal.mode === "remove" ? (
          <Modal.Title>
            Haluatko varmasti poistaa seuraavan toimituksen?
          </Modal.Title>
        ) : (
          ""
        )}
      </Modal.Header>
      <Modal.Body>
        {adminModal.mode === "new" || adminModal.mode === "edit" ? (
          <div>
            <Form onSubmit={handleSubmit}>
              {/*Material*/}
              <Row style={{ marginBottom: 10 }}>
                <Col sm={3}>
                  <label className="admin-form-text" htmlFor="material">
                    Materiaali
                  </label>
                </Col>
                <Col sm={9}>
                  <Form.Control
                    as="select"
                    name="material"
                    id="material"
                    value={props.adminModalData.material}
                    onChange={handleChange}
                    required
                  >
                    <option hidden></option>
                    {props.selectData.material !== undefined &&
                      props.selectData.material.map((materialData, index) => (
                        <option key={index} value={materialData}>
                          {materialData}
                        </option>
                      ))}
                  </Form.Control>
                </Col>
              </Row>

              {/*Day*/}
              <Row>
                <Col sm={3}>
                  <label className="admin-form-text" htmlFor="day">
                    Viikonpäivä
                  </label>
                </Col>
                <Col sm={9}>
                  <Form.Control
                    as="select"
                    name="day"
                    id="day"
                    value={props.adminModalData.day}
                    onChange={handleChange}
                    required
                  >
                    <option hidden></option>
                    {props.selectData.day !== undefined &&
                      props.selectData.day.map((dayData, index) => (
                        <option key={index} value={dayData}>
                          {dayData}
                        </option>
                      ))}
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
                  <label className="admin-form-text" htmlFor="driver">
                    Kuljettaja
                  </label>
                </Col>
                <Col sm={9}>
                  <Form.Control
                    as="select"
                    name="driver"
                    id="driver"
                    value={props.adminModalData.driver}
                    onChange={handleChange}
                    required
                  >
                    <option hidden></option>
                    {props.selectData.driver !== undefined &&
                      props.selectData.driver.map((driverData, index) => (
                        <option key={index} value={driverData}>
                          {driverData}
                        </option>
                      ))}
                  </Form.Control>
                </Col>
              </Row>

              {/*Destination*/}
              <Row style={{ marginBottom: 10 }}>
                <Col sm={3}>
                  <label className="admin-form-text" htmlFor="destination">
                    Kohde
                  </label>
                </Col>
                <Col sm={9}>
                  <Form.Control
                    as="select"
                    name="destination"
                    id="destination"
                    value={props.adminModalData.destination}
                    onChange={handleChange}
                    required
                  >
                    <option hidden></option>
                    {props.selectData.destination !== undefined &&
                      props.selectData.destination.map(
                        (destinationData, index) => (
                          <option key={index} value={destinationData}>
                            {destinationData}
                          </option>
                        )
                      )}
                  </Form.Control>
                </Col>
              </Row>

              {/*Time*/}
              <Row style={{ marginBottom: 10 }}>
                <Col sm={3}>
                  <label className="admin-form-text" htmlFor="time">
                    Kellonaika
                  </label>
                </Col>
                <Col sm={9}>
                  <Form.Control
                    name="time"
                    id="time"
                    value={props.adminModalData.time}
                    onChange={handleChange}
                  ></Form.Control>
                </Col>
              </Row>

              {/*Direction*/}
              <Row style={{ marginBottom: 10 }}>
                <Col sm={3}>
                  <label className="admin-form-text" htmlFor="direction">
                    Suunta
                  </label>
                </Col>
                <Col sm={9}>
                  <Form.Control
                    as="select"
                    name="direction"
                    id="direction"
                    value={props.adminModalData.direction}
                    onChange={handleChange}
                    required
                  >
                    <option hidden></option>
                    {props.selectData.direction !== undefined &&
                      props.selectData.direction.map((directionData, index) => (
                        <option key={index} value={directionData}>
                          {directionData}
                        </option>
                      ))}
                  </Form.Control>
                </Col>
              </Row>

              {/*Info*/}
              <Row style={{ marginBottom: 10 }}>
                <Col sm={3}>
                  <label className="admin-form-text" htmlFor="info">
                    Lisätieto
                  </label>
                </Col>
                <Col sm={9}>
                  <Form.Control
                    name="info"
                    id="info"
                    value={props.adminModalData.info}
                    onChange={handleChange}
                  ></Form.Control>
                </Col>
              </Row>
              {adminModal.mode === "new" ? (
                <Button
                  className="w-100"
                  type="submit"
                  disabled={loading}
                >Lisää toimitus</Button>
              ) : (
                <Button
                  className="w-100"
                  type="submit"
                  disabled={loading}
                >Tallenna muutokset</Button>
              )}
            </Form>
          </div>
        ) : adminModal.mode === "remove" ? (
          <Form onSubmit={handleSubmit}>
            <p>
              {props.adminModalData.destination} | {props.adminModalData.day},{" "}
              {props.adminModalData.time}
            </p>
            <Button
              style={{ marginRight: 10 }}
              type="submit"
              disabled={loading}
            >Kyllä</Button>
            <Button
              onClick={() => handleAdminModal(false, null)}
              disabled={loading}
            >
              Peruuta
            </Button>
          </Form>
        ) : (
          ""
        )}
      </Modal.Body>
    </Modal>
  );
}

export default AdminModal;
