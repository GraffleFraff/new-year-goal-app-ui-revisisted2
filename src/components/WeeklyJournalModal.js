import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const WeeklyJournalModal = ({ show, handleClose, handleSubmit }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header style={{ backgroundColor: "#e9ecef" }} closeButton>
        <Modal.Title>
          <b>Weekly Journal</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>
              Now that the week is over, reflect on how it went. What went well?
              What didn't go well?
            </Form.Label>
            <Form.Control type="text" placeholder="Enter your thoughts" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Are the goals you are setting in line with your high-level vision?
            </Form.Label>
            <Form.Control type="text" placeholder="Enter your thoughts" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              What adjustments could you make heading into the next week to help
              you accomplish your goals
            </Form.Label>
            <Form.Control type="text" placeholder="Enter your thoughts" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ borderTop: "none" }}>
        <Button variant="outline-secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WeeklyJournalModal;
