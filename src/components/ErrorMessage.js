import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const CustomAlert = ({ message, onClose }) => {
  return (
    <Modal show={!!message} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>تنبيه</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          إغلاق
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomAlert;
