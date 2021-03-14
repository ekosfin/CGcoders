import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Spinner } from "react-bootstrap";
import { useData } from "./contexts/DataContext";

export default function Schedule() {
  const { data, getData } = useData();
  const [modal, setModal] = useState({
    open: false,
    data: {
      dayItem: "",
      dayInfo: ""
    }
  });
  const [loading, setLoading] = useState(true);
  const INTERVAL_TIME = 5 * 60 * 1000;

  //hakee datan kun siirtyy sivulle
  useEffect(() => {
    const fetchData = async () => {
      let result = await getData();
      if (result) {
        console.log("Success");
      }
      else {
        console.log("Failed");
      }
    }

    fetchData();


    const timer = setInterval(() => {
      console.log("Loading new data");
      fetchData();
    }, INTERVAL_TIME);
    return () => {
      clearInterval(timer);
      console.log("Clearing interval");
    };
  }, []);

  useEffect(() => {
    console.log(data);
    if (data.length > 0) {
      setLoading(false);
    }
  }, [data]);

  
  const handleModalShow = (dayData) => {
    console.log(dayData);
    setModal({
      open: true,
      data: dayData
    })
  }

  const handleModalClose = () => {
    setModal({
      open: false,
      data: {
        dayItem: "",
        dayInfo: ""
      }
    })
  }

  const editData = (data) => {
    let dataList = data.dayItem.split(" ");
    if (dataList.length > 2) {
      return(dataList[0].substring(0,2) + " " + dataList[1].substring(0,1) + dataList[2]);
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
        <Modal show={modal.open} onHide={handleModalClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{modal.data.dayItem}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modal.data.twoWay ? <p>Tämä kuljetus on kaksisuuntainen</p> : ""}
            {modal.data.dayInfo.length > 0 ?
              <p>
                Lisätieto: {modal.data.dayInfo}
              </p>
              :
              <p>
                Tälle kuljetukselle ei ole asetettu lisätietoa
              </p>
            }

          </Modal.Body>
        </Modal>
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

          {data.map((material, index1) => (
            <Row className="" key={index1}>
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
                    <div style={{ backgroundColor: dayData.color }} className="grid-item" onClick={() => { handleModalShow(dayData) }} key={index3}>
                      {dayData.dayInfo.length > 0 ? (
                        <div>
                          <div className="grid-text-bold">
                            {editData(dayData)}
                            {dayData.twoWay ? "" /*<img alt="Two way" src={twoWay} />*/ : ""}
                          </div>
                          <div className="grid-info">{dayData.dayInfo}</div>
                        </div>
                      ) : (
                        <div>
                          <div className="grid-text-normal">
                            {editData(dayData)}
                            {dayData.twoWay ? "" /*<img alt="Two way" src={twoWay} />*/ : ""}
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
      </div>
      }
    </div>
  );
}
