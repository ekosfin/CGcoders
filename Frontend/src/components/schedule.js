import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useData } from "./contexts/DataContext";
import DeliveryModal from "./deliveryModal";
import AdminModal from "./adminModal";
import twoWay from "../twoWay.svg";

export default function Schedule() {
  const {
    data,
    getData,
    clearData,
    userRights,
    setDataContextLoading,
    dataContextLoading,
  } = useData();

  const [deliveryModal, setDeliveryModal] = useState({
    open: false,
    data: null,
  });
  const [adminModalData, setAdminModalData] = useState({
    material: "",
    day: "",
    driver: "",
    destination: "",
    time: "",
    direction: "",
    info: "",
    idNum: null,
  });
  const [selectData, setSelectData] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCancelled, setIsCancelled] = useState(false);

  const setAdminModalSelectData = (data) => {
    let adminModalDataList = {},
      materialList = [],
      driverList = [];
    data.schedule.forEach((element) => {
      materialList.push(element.materialName);
    });
    data.drivers.forEach((element) => {
      driverList.push(element.driver);
    });
    adminModalDataList.material = materialList;
    adminModalDataList.destination = data.destinations;
    adminModalDataList.driver = driverList;
    adminModalDataList.day = [
      "Maanantai",
      "Tiistai",
      "Keskiviikko",
      "Torstai",
      "Perjantai",
      "Lauantai",
      "Sunnuntai",
    ];
    adminModalDataList.direction = ["Meno", "Meno-paluu"];
    setSelectData(adminModalDataList);
  };

  const fetchData = async () => {
    //Checks for active fetch requests and aborts if it detects any
    if (dataContextLoading) {
      return;
    }
    setDataContextLoading(true);
    let result = await getData();
    if (isCancelled) {
      return;
    }
    if (result) {
      setError("");
    } else {
      setError(
        "Tietojen hakeminen epäonnistui. Yritetään uudelleen hetken kuluttua."
      );
    }
    if (loading) {
      setLoading(false);
    }
    setDataContextLoading(false);
  };

  //Fetches data on first load and sets an X minute timer to reload data
  useEffect(() => {
    fetchData();

    const timer = setInterval(() => {
      fetchData();
    }, 5 * 60 * 1000);

    //Handle logout, clearing data
    return () => {
      clearInterval(timer);
      setIsCancelled(true);
      clearData();
    };
  }, []);

  useEffect(() => {
    console.log(data);
    if (
      data.schedule !== undefined &&
      data.schedule.length > 0 &&
      userRights === "admin"
    ) {
      setAdminModalSelectData(data);
    }
  }, [data]);

  //Handles delivery modal open / close
  const handleDeliveryModal = (openState, dayData) => {
    setDeliveryModal({
      open: openState,
      data: dayData,
    });
  };

  return (
    <div>
      {loading ? (
        <div data-testid="loading" className="loading">
          <Spinner animation="border" />
        </div>
      ) : (
        <div>
          <DeliveryModal
            deliveryModal={deliveryModal}
            handleDeliveryModal={handleDeliveryModal}
            setAdminModalData={setAdminModalData}
          />
          {userRights === "admin" && (
            <AdminModal
              selectData={selectData}
              adminModalData={adminModalData}
              setAdminModalData={setAdminModalData}
            />
          )}

          {error.length > 0 && <Alert variant="warning">{error}</Alert>}

          {data.schedule !== undefined && data.schedule.length > 0 ? (
            <Container className="grid-container" fluid>
              <Row>
                <Col
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                  className="grid-material"
                ></Col>
                <Col
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                  className="grid-weekday-large"
                >
                  Maanantai
                </Col>
                <Col
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                  className="grid-weekday-large"
                >
                  Tiistai
                </Col>
                <Col
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                  className="grid-weekday-large"
                >
                  Keskiviikko
                </Col>
                <Col
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                  className="grid-weekday-large"
                >
                  Torstai
                </Col>
                <Col
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                  className="grid-weekday-large"
                >
                  Perjantai
                </Col>
                <Col
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                  className="grid-weekday-large"
                >
                  Lauantai
                </Col>
                <Col
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                  className="grid-weekday-large"
                >
                  Sunnuntai
                </Col>

                <Col
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                  className="grid-weekday-small"
                >
                  Ma
                </Col>
                <Col
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                  className="grid-weekday-small"
                >
                  Ti
                </Col>
                <Col
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                  className="grid-weekday-small"
                >
                  Ke
                </Col>
                <Col
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                  className="grid-weekday-small"
                >
                  To
                </Col>
                <Col
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                  className="grid-weekday-small"
                >
                  Pe
                </Col>
                <Col
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                  className="grid-weekday-small"
                >
                  La
                </Col>
                <Col
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                  className="grid-weekday-small"
                >
                  Su
                </Col>
              </Row>

              {data.schedule.map((material, index1) => (
                <Row key={index1}>
                  <Col
                    style={{ paddingLeft: 0, paddingRight: 0 }}
                    className="grid-material"
                  >
                    {material.materialName}
                  </Col>
                  {material.data.map((dataItem, index2) => (
                    <Col
                      style={{ paddingLeft: 0, paddingRight: 0 }}
                      className="grid-item-container"
                      key={index2}
                    >
                      {dataItem.map((dayData, index3) => (
                        <div
                          style={{ backgroundColor: dayData.color }}
                          className="grid-item"
                          onClick={() => {
                            handleDeliveryModal(true, dayData);
                          }}
                          key={index3}
                        >
                          {dayData.dayInfo.length > 0 ? (
                            <div>
                              <div className="grid-text-bold">
                                {dayData.driver?.substring(0, 2) +
                                  " " +
                                  dayData.destination?.substring(0, 1) +
                                  dayData.time}
                                {dayData.twoWay && (
                                  <img
                                    style={{ margin: 5 }}
                                    alt="Two way"
                                    src={twoWay}
                                  />
                                )}
                              </div>
                              <div className="grid-info">{dayData.dayInfo}</div>
                            </div>
                          ) : (
                            <div>
                              <div className="grid-text-normal">
                                {dayData.driver?.substring(0, 2) +
                                  " " +
                                  dayData.destination?.substring(0, 1) +
                                  dayData.time}
                                {dayData.twoWay && (
                                  <img
                                    style={{ margin: 5 }}
                                    alt="Two way"
                                    src={twoWay}
                                  />
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </Col>
                  ))}
                </Row>
              ))}
            </Container>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}
