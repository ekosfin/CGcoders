import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Spinner } from "react-bootstrap";
import { useData } from "./contexts/DataContext";

export default function schedule() {
  const { data, getData } = useData();
  const [modal, setModal] = useState({
    open: false,
    data: {
      dayItem: "",
      dayInfo: "",
      color: null
    }
  });
  const [loading, setLoading] = useState(true);
  const [colorData, setColorData] = useState([]);

  //hakee datan kun siirtyy sivulle
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      let list = [];
      data.forEach(element => {
        element.data.forEach(dataElement => {
          dataElement.forEach(dayData => {
            /*Make a list of all the unique names */
            let dayDataList = dayData.dayItem.split(" ");
            if (!list.includes(dayDataList[0])) {
              list.push(dayDataList[0]);
            } 
          });
        });
      });
      list.sort();

      let colorList = [], colorInteger = 0;
      /*Giving each name a color that is used for cards*/
      list.forEach(nameData => {
        colorList.push({ name: nameData, color: `hsl(${colorInteger}, 70%, 60%)` });
        colorInteger += 40;
      });

      setColorData(colorList);
      setLoading(false);
    }
  }, [data]);

  
  const handleModalShow = (dayData) => {
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
        dayInfo: "",
        color: null
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

  const setColor = (data) => {
    let dataList = data.dayItem.split(" ");
    if (dataList.length > 2) {
      let foundItem = colorData.find(item => item.name === dataList[0]);
      //console.log(foundItem);
      return foundItem.color;
    }
    console.log("Error!");
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
            {modal.data.dayInfo.length > 0 ?
              <div>
                Lisätieto: {modal.data.dayInfo}
              </div>
              :
              <div>
                Tälle kuljetukselle ei ole asetettu lisätietoa
              </div>
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
                    <div style={{ backgroundColor: setColor(dayData) }} className="grid-item" onClick={() => { handleModalShow(dayData) }} key={index3}>
                      {dayData.dayInfo.length > 0 ? (
                        <div>
                          <div className="grid-text-bold">{editData(dayData)}</div>
                          <div className="grid-info">{dayData.dayInfo}</div>
                        </div>
                      ) : (
                        <div>
                          <div className="grid-text-normal">{editData(dayData)}</div>
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
