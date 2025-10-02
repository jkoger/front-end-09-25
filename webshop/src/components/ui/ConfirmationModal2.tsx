import { useImperativeHandle, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface ConfirmationModal2Interface {
  deleteItem: () => void;
  subject: string;
  ref: any;
}

export interface ConfirmationModal2Type {
  handleShow: () => void;
  handleClose: () => void;
}

const ConfirmationModal2 = ({
  deleteItem,
  subject,
  ref,
}: ConfirmationModal2Interface) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  console.log("Test", ref);

  useImperativeHandle(ref, () => ({
    handleShow() {
      setShow(true);
    },

    handleClose() {
      setShow(false);
    },
  }));

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Deleting {subject} </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You are about to delete a {subject}, this is irreversible!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={deleteItem}>
          Yes I want to delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal2;
