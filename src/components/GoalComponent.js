import React from "react";
import { Card, Form, Button } from "react-bootstrap";

const GoalComponent = ({ goal, updateStatus, onEdit, onDelete }) => {
  const dropdownStyle = {
    backgroundColor:
      goal.status === "in progress"
        ? "#ffc107"
        : goal.status === "completed"
        ? "#198754"
        : "white",
    color: goal.status === "completed" ? "white" : "black", // Optional: change text color for better contrast
  };

  const handleStatusChange = (newStatus) => {
    updateStatus(goal.id, newStatus);
  };

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <Form.Group>
            <Card.Title>
              <b>Goal Name:</b> {goal.name}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <b>Frequency:</b> {goal.frequency}
            </Card.Subtitle>
            <Button onClick={onEdit} variant="outline-secondary" size="sm">
              Edit
            </Button>
            <Button
              variant="outline-danger"
              onClick={onDelete}
              size="sm"
              style={{ marginLeft: "10px" }}
              className="shadow-sm"
            >
              Delete
            </Button>
          </Form.Group>
          <Form.Group controlId="statusSelect" className="align-self-start">
            <Form.Select
              value={goal.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              style={dropdownStyle}
            >
              <option value="not started">Not Started</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </Form.Select>
          </Form.Group>
        </div>
      </Card.Body>
    </Card>
  );
};

export default GoalComponent;
