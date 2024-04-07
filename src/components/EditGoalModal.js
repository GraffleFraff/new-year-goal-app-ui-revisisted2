import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditGoalModal = ({ show, onHide, onSubmit, editingGoal }) => {
  const [goalName, setGoalName] = useState("");
  const [goalFrequency, setGoalFrequency] = useState("");

  const [goalNameError, setGoalNameError] = useState(false);
  const [goalFrequencyError, setGoalFrequencyError] = useState(false);

  useEffect(() => {
    if (show) {
      setGoalName(editingGoal ? editingGoal.name : "");
      setGoalFrequency(editingGoal ? editingGoal.frequency : "");
    }
  }, [show, editingGoal]);

  const handleSubmit = () => {
    // Reset error states each time the button is clicked
    setGoalNameError(false);
    setGoalFrequencyError(false);

    // Validation checks
    if (!goalName.trim()) {
      setGoalNameError(true); // Set error state for goal name
    }
    if (!goalFrequency) {
      setGoalFrequencyError(true); // Set error state for goal frequency
    }

    // If either field is invalid, prevent form submission
    if (!goalName.trim() || !goalFrequency) {
      return;
    }

    // Check if we are editing an existing goal
    if (editingGoal) {
      const updatedGoal = {
        ...editingGoal,
        name: goalName,
        frequency: goalFrequency,
      };
      onSubmit(updatedGoal); // Pass the updated goal back
    } else {
      // For adding a new goal, create a new goal object
      const newGoal = {
        id: Date.now(),
        name: goalName,
        frequency: goalFrequency,
        status: "not started",
      };
      onSubmit(newGoal); // Pass the new goal back
    }
    onHide(); // Hide the modal after submission
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header style={{ backgroundColor: "#e9ecef" }} closeButton>
        <Modal.Title>
          <b>{editingGoal ? "Edit Goal" : "Add Goal"}</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="goalName">
            <Form.Label>Name of Goal</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter goal name"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              isInvalid={goalNameError}
            />
            {goalNameError && (
              <Form.Control.Feedback type="invalid">
                Please enter a goal name.
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="goalFrequency">
            <Form.Label>Frequency</Form.Label>
            <Form.Select
              value={goalFrequency}
              onChange={(e) => setGoalFrequency(e.target.value)}
              isInvalid={goalFrequencyError}
            >
              <option value="">Select frequency</option>
              <option value="1x a week">1x a week</option>
              <option value="2x a week">2x a week</option>
              <option value="3x a week">3x a week</option>
              <option value="4x a week">4x a week</option>
              <option value="5x a week">5x a week</option>
              <option value="6x a week">6x a week</option>
              <option value="7x a week">7x a week</option>
              <option value="Every Weekday">Every Weekday</option>
              <option value="Every Weekend Day">Every Weekend Day</option>
            </Form.Select>
            {goalFrequencyError && (
              <Form.Control.Feedback type="invalid">
                Please select a frequency.
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ borderTop: "none" }}>
        <Button variant="outline-secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditGoalModal;
