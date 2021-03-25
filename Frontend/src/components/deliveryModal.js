import React from "react";
import { Modal } from "react-bootstrap"

function DeliveryModal(props) {



  return (
    props.deliveryModal.data !== null ? (
      <Modal show={props.deliveryModal.open} onHide={() => props.handleDeliveryModal(null, false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{props.deliveryModal.data.dayItem}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.deliveryModal.data.twoWay ? <p>Tämä kuljetus on kaksisuuntainen</p> : ""}
          {props.deliveryModal.data.dayInfo.length > 0 ?
            <p>
              Lisätieto: {props.deliveryModal.data.dayInfo}
            </p>
            :
            <p>
              Tälle kuljetukselle ei ole asetettu lisätietoa
            </p>
          }
        </Modal.Body>
      </Modal>
    ) : ""
  );
}

export default DeliveryModal;