import React from "react";
import { Modal, Button } from "react-bootstrap"
import { useAdminData } from "./contexts/AdminDataContext";
import { useData } from "./contexts/DataContext";

function DeliveryModal(props) {
  const { handleAdminModal } = useAdminData();
  const { userRights } = useData();

  const handleEditDelivery = () => {
    let twoWay = props.deliveryModal.data.twoWay ? "Meno-paluu" : "Meno";
    props.handleDeliveryModal(null, false);
    props.setAdminModalData({
      material: props.deliveryModal.data.material,
      day: props.deliveryModal.data.day,
      driver: props.deliveryModal.data.dayItem.split(" ")[0],
      destination: props.deliveryModal.data.dayItem.split(" ")[1],
      time: props.deliveryModal.data.dayItem.split(" ")[2],
      direction: twoWay,
      info: props.deliveryModal.data.dayInfo,
      idNum: props.deliveryModal.data.idNum
    });
    handleAdminModal(true, "edit");
  }

  const handleRemoveDelivery = () => {
    let twoWay = props.deliveryModal.data.twoWay ? "Meno-paluu" : "Meno";
    props.handleDeliveryModal(null, false);
    props.setAdminModalData({
      material: props.deliveryModal.data.material,
      day: props.deliveryModal.data.day,
      driver: props.deliveryModal.data.dayItem.split(" ")[0],
      destination: props.deliveryModal.data.dayItem.split(" ")[1],
      time: props.deliveryModal.data.dayItem.split(" ")[2],
      direction: twoWay,
      info: props.deliveryModal.data.dayInfo,
      idNum: props.deliveryModal.data.idNum
    });
    handleAdminModal(true, "remove");
  }

  return (
    props.deliveryModal.data !== null ? (
      <Modal show={props.deliveryModal.open} onHide={() => props.handleDeliveryModal(null, false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Toimituksen tiedot
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: 0 }}>
          <div className="delivery-modal-container">
            <div className="delivery-modal-destination">
              {props.deliveryModal.data.dayItem.split(" ")[1]}
            </div>
            {props.deliveryModal.data.day}, kello {props.deliveryModal.data.dayItem.split(" ")[2]}
          </div>
          <hr style={{ margin: 0 }} />
          <div className="delivery-modal-container">
            <div className="delivery-modal-info">
              <div className="delivery-modal-name">Materiaali:</div>
              {props.deliveryModal.data.material}
            </div>

            <div className="delivery-modal-info">
              <div className="delivery-modal-name">Kuljettaja:</div>
              {props.deliveryModal.data.dayItem.split(" ")[0]}
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
            <div>
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