import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useData } from "./contexts/DataContext";
import DeliveryModal from "./deliveryModal";
import AdminModal from "./adminModal";
import twoWay from "../twoWay.svg";

export default function Schedule() {
  const { data, getData, clearData, userRights } = useData();

  const [deliveryModal, setDeliveryModal] = useState({
    open: false,
    data: null
  });
  const [adminModalDefaultData, setAdminModalDefaultData] = useState({
    material: "",
    day: "",
    driver: "",
    destination: "",
    time: "",
    direction: "",
    info: ""
  });
  const [selectData, setSelectData] = useState([]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCancelled, setIsCancelled] = useState(false);
  const INTERVAL_TIME = 5 * 60 * 1000;

  const setAdminModalData = (data) => {
    let adminModalDataList = [], materialList = [];
    data.schedule.forEach(element => {
      materialList.push(element.materialName);
    });
    adminModalDataList.material = materialList;
    adminModalDataList.destination = data.destinations;
    adminModalDataList.driver = data.drivers;
    adminModalDataList.day = ["Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai", "Sunnuntai"];
    adminModalDataList.direction = ["Meno", "Meno-paluu"];
    setSelectData(adminModalDataList);
  }

  const fetchData = async () => {
    let result = await getData();
    if (isCancelled) {
      return;
    }
    if (result) {
      setError("");
      console.log("Loaded data successfully");
    }
    else {
      setError("Tietojen hakeminen epäonnistui. Yritetään uudelleen hetken kuluttua.");
    }
    if (loading) {
      setLoading(false)
    }
  }

  //Fetches data on first load and sets an INTERVAL_TIME minute timer to reload data
  useEffect(() => {
    fetchData();

    const timer = setInterval(() => {
      console.log("Loading new data");
      fetchData();
    }, INTERVAL_TIME);

    //Handle logout, clearing data
    return () => {
      clearInterval(timer);
      setIsCancelled(true);
      clearData();
      console.log("Clearing interval");
    };
  }, []);

  useEffect(() => {
    if (data.schedule !== undefined && data.schedule.length > 0 && userRights === "admin") {
      setAdminModalData(data);
    }
  }, [data]);


  //Handles delivery modal open / close
  const handleDeliveryModal = (dayData, openState) => {
    setDeliveryModal({
      open: openState,
      data: dayData
    });
  }

  const editData = (data) => {
    let dataList = data.dayItem.split(" ");
    if (dataList.length > 2) {
      return (dataList[0].substring(0, 2) + " " + dataList[1].substring(0, 1) + dataList[2]);
    }
    return null;
  }



  return (
    <div>
      {loading ?
        <div className="loading">
          <Spinner animation="border" />
        </div>
        :
        <div>
          <DeliveryModal deliveryModal={deliveryModal} handleDeliveryModal={handleDeliveryModal} setAdminModalDefaultData={setAdminModalDefaultData}/>
          {userRights === "admin" &&
            <AdminModal selectData={selectData} adminModalDefaultData={adminModalDefaultData} setAdminModalDefaultData={setAdminModalDefaultData}/>
          }

          {error.length > 0 && <Alert variant="warning">{error}</Alert>}

          {data.schedule !== undefined && data.schedule.length > 0 ?
            <Container className="grid-container" fluid>
              <Row>
                <Col style={{ paddingLeft: 0, paddingRight: 0 }} className="grid-material"></Col>
                <Col style={{ paddingLeft: 0, paddingRight: 0 }} className="grid-weekday-large">Maanantai</Col>
                <Col style={{ paddingLeft: 0, paddingRight: 0 }} className="grid-weekday-large">Tiistai</Col>
                <Col style={{ paddingLeft: 0, paddingRight: 0 }} className="grid-weekday-large">Keskiviikko</Col>
                <Col style={{ paddingLeft: 0, paddingRight: 0 }} className="grid-weekday-large">Torstai</Col>
                <Col style={{ paddingLeft: 0, paddingRight: 0 }} className="grid-weekday-large">Perjantai</Col>
                <Col style={{ paddingLeft: 0, paddingRight: 0 }} className="grid-weekday-large">Lauantai</Col>
                <Col style={{ paddingLeft: 0, paddingRight: 0 }} className="grid-weekday-large">Sunnuntai</Col>

                <Col style={{ paddingLeft: 0, paddingRight: 0 }} className="grid-weekday-small">Ma</Col>
                <Col style={{ paddingLeft: 0, paddingRight: 0 }} className="grid-weekday-small">Ti</Col>
                <Col style={{ paddingLeft: 0, paddingRight: 0 }} className="grid-weekday-small">Ke</Col>
                <Col style={{ paddingLeft: 0, paddingRight: 0 }} className="grid-weekday-small">To</Col>
                <Col style={{ paddingLeft: 0, paddingRight: 0 }} className="grid-weekday-small">Pe</Col>
                <Col style={{ paddingLeft: 0, paddingRight: 0 }} className="grid-weekday-small">La</Col>
                <Col style={{ paddingLeft: 0, paddingRight: 0 }} className="grid-weekday-small">Su</Col>
              </Row>

              {data.schedule.map((material, index1) => (
                <Row key={index1}>
                  <Col
                    style={{ paddingLeft: 0, paddingRight: 0 }}
                    className="grid-material">
                    {material.materialName}
                  </Col>
                  {material.data.map((dataItem, index2) => (
                    <Col
                      style={{ paddingLeft: 0, paddingRight: 0 }}
                      className="grid-item-container"
                      key={index2}>
                      {dataItem.map((dayData, index3) => (
                        <div style={{ backgroundColor: dayData.color }} className="grid-item" onClick={() => { handleDeliveryModal(dayData, true) }} key={index3}>
                          {dayData.dayInfo.length > 0 ? (
                            <div>
                              <div className="grid-text-bold">
                                {editData(dayData)}
                                {dayData.twoWay && <img style={{ margin: 5 }} alt="Two way" src={twoWay} />}
                              </div>
                              <div className="grid-info">{dayData.dayInfo}</div>
                            </div>
                          ) : (
                            <div>
                              <div className="grid-text-normal">
                                {editData(dayData)}
                                {dayData.twoWay && <img style={{ margin: 5 }} alt="Two way" src={twoWay} />}
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
            : ""}
        </div>
      }
    </div>
  );
}
