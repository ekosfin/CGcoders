import React from "react";
import { Modal } from "react-bootstrap"

function DeliveryModal(props) {

  const handleModalClose = () => {
    props.setModal({
      open: false,
      data: {
        dayItem: "",
        dayInfo: ""
      }
    });
  }

  return (
    <Modal show={props.modal.open} onHide={handleModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.modal.data.dayItem}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.modal.data.twoWay ? <p>Tämä kuljetus on kaksisuuntainen</p> : ""}
        {props.modal.data.dayInfo.length > 0 ?
          <p>
            Lisätieto: {props.modal.data.dayInfo}
          </p>
          :
          <p>
            Tälle kuljetukselle ei ole asetettu lisätietoa
          </p>
        }

      </Modal.Body>
    </Modal>
  );
}

export default DeliveryModal;