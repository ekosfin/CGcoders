import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useData } from "./contexts/DataContext";

export default function schedule() {
  const { data, getData } = useData();

  //hakee datan kun siirtyy sivulle
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container className="grid-container" fluid>
      <Row>
        <Col className="grid-material"></Col>
        <Col className="grid-weekday-large">Maanantai</Col>
        <Col className="grid-weekday-large">Tiistai</Col>
        <Col className="grid-weekday-large">Keskiviikko</Col>
        <Col className="grid-weekday-large">Torstai</Col>
        <Col className="grid-weekday-large">Perjantai</Col>
        <Col className="grid-weekday-large">Lauantai / Sunnuntai</Col>

        <Col className="grid-weekday-small">Ma</Col>
        <Col className="grid-weekday-small">Ti</Col>
        <Col className="grid-weekday-small">Ke</Col>
        <Col className="grid-weekday-small">To</Col>
        <Col className="grid-weekday-small">Pe</Col>
        <Col className="grid-weekday-small">La/Su</Col>
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
                <div style={{ backgroundColor: dayData.color }} className="grid-item" key={index3}>
                  {dayData.dayInfo.length > 0 ? (
                    <div>
                      <div className="grid-text-bold">{dayData.dayItem}</div>
                      <div className="grid-info">{dayData.dayInfo}</div>
                    </div>
                  ) : (
                    <div>
                      <div className="grid-text-normal">{dayData.dayItem}</div>
                    </div>
                  )}
                </div>
              ))}
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
}
