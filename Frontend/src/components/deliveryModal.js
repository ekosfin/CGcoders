import React from "react";
import { Modal, Button } from "react-bootstrap"
import { useAdminData } from "./contexts/AdminDataContext";
import { useData } from "./contexts/DataContext";

function DeliveryModal(props) {
  const { handleAdminModal } = useAdminData();
  const { userRights } = useData();

  const handleEditDelivery = () => {
    let twoWay = props.deliveryModal.data.twoWay ? "Meno-paluu" : "Meno";
    props.handleDeliveryModal(false, null);
    props.setAdminModalData({
      material: props.deliveryModal.data.material,
      day: props.deliveryModal.data.day,
      driver: props.deliveryModal.data.driver,
      destination: props.deliveryModal.data.destination,
      time: props.deliveryModal.data.time,
      direction: twoWay,
      info: props.deliveryModal.data.dayInfo,
      idNum: props.deliveryModal.data.idNum
    });
    handleAdminModal(true, "edit");
  }

  const handleRemoveDelivery = () => {
    let twoWay = props.deliveryModal.data.twoWay ? "Meno-paluu" : "Meno";
    props.handleDeliveryModal(false, null);
    props.setAdminModalData({
      material: props.deliveryModal.data.material,
      day: props.deliveryModal.data.day,
      driver: props.deliveryModal.data.driver,
      destination: props.deliveryModal.data.destination,
      time: props.deliveryModal.data.time,
      direction: twoWay,
      info: props.deliveryModal.data.dayInfo,
      idNum: props.deliveryModal.data.idNum
    });
    handleAdminModal(true, "remove");
  }

  return (
    props.deliveryModal.data !== null ? (
      <Modal show={props.deliveryModal.open} onHide={() => props.handleDeliveryModal(false, null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Toimituksen tiedot
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: 0 }}>
          <div className="delivery-modal-container">
            <div className="delivery-modal-destination">
              {props.deliveryModal.data.destination}
            </div>
            <div className="delivery-modal-date-row">
              {props.deliveryModal.data.day} {props.deliveryModal.data.time !== "" && <div>, {props.deliveryModal.data.time}</div>}
            </div>
          </div>
          <hr style={{ margin: 0 }} />
          <div className="delivery-modal-container">
            <div className="delivery-modal-info">
              <div className="delivery-modal-name">Materiaali:</div>
              <div>{props.deliveryModal.data.material}</div>
            </div>

            <div className="delivery-modal-info">
              <div className="delivery-modal-name">Kuljettaja:</div>
              <div>{props.deliveryModal.data.driver}</div>
            </div>
            <div className="delivery-modal-info">
              <div className="delivery-modal-name">Lisätieto:</div>
              {props.deliveryModal.data.dayInfo.length > 0 ? <div>{props.deliveryModal.data.dayInfo}</div> : <div>-</div>}
            </div>
            <div className="delivery-modal-info">
              <div className="delivery-modal-name">Suunta:</div>
              {props.deliveryModal.data.twoWay ? <div>Meno-paluu</div> : <div>Meno</div>}
            </div>
            {userRights === "admin" &&
            <div style={{ marginTop: 16 }}>
              <Button style={{marginRight: 10}} onClick={handleEditDelivery}>Muokkaa</Button>
              <Button onClick={handleRemoveDelivery}>Poista</Button>
            </div>}
          </div>
        </Modal.Body>
      </Modal>
    ) : ""
  );
}

export default DeliveryModal;