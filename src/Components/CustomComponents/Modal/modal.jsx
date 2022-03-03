import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
export default function ModalComponent({
  modaalTitle,
  modalBody,
  modaalFooter,
  modalState,
  handleClose,
}) {
  return (
    <>
      <Modal show={modalState} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{modaalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>{modaalFooter}</Modal.Footer>
      </Modal>
    </>
  );
}
