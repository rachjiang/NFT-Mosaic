import React from "react";
import { Modal, Button } from "react-bootstrap";

const OpenModal = ({ nft, handleCloseModal }) => {
  return (
    <Modal show={true} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{nft.metadata.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={nft.metadata.image} alt={nft.metadata.name} />
        <p>{nft.metadata.description}</p>
        <p>Attributes: {nft.metadata.attributes.join(", ")}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OpenModal;
