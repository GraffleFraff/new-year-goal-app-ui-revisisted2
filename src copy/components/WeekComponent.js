import React, { useState } from "react";
import EditGoalModal from "./EditGoalModal";
import GoalComponent from "./GoalComponent";
import WeeklyJournalModal from "./WeeklyJournalModal";
import { Button, Card } from "react-bootstrap";
import PercentComponent from "./PercentComponent";

const WeekComponent = ({ goals, setGoals }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null); // State to track the goal being edited
  // const [goals, setGoals] = useState([]);
  const handleGoalSubmit = (submittedGoal) => {
    if (editingGoal) {
      // Update an existing goal
      setGoals(
        goals.map((goal) =>
          goal.id === submittedGoal.id ? submittedGoal : goal
        )
      );
    } else {
      // Add a new goal
      setGoals([...goals, { ...submittedGoal, id: Date.now() }]);
    }
    setIsModalVisible(false);
    setEditingGoal(null); // Reset after submission
  };

  const updateGoalStatus = (id, newStatus) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === id ? { ...goal, status: newStatus } : goal
    );
    setGoals(updatedGoals);
  };

  // edit goal updates
  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
    setIsModalVisible(true);
  };

  const handleCloseEditingModal = () => {
    setIsModalVisible(false);
    setEditingGoal(null); // Reset edited goal to null when closing the modal
  };

  const handleDeleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  // Weekly Journal needs some refactoring
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleSubmit = () => {
    console.log("Submit journal entries");
    setShowModal(false);
  };
  const handleJournalClick = () => {
    setShowModal(true);
  };

  return (
    <Card>
      <Card.Header>
        <h5>List of Goals</h5>
      </Card.Header>
      <Card.Body>
        {goals.map((goal) => (
          <GoalComponent
            key={goal.id}
            goal={goal}
            updateStatus={updateGoalStatus}
            onEdit={() => handleEditGoal(goal)}
            onDelete={() => handleDeleteGoal(goal.id)}
          />
        ))}
        <Button onClick={() => setIsModalVisible(true)}>Add Goal</Button>
      </Card.Body>
      <Card.Footer>
        <PercentComponent goals={goals} />
        <Button
          className="btn btn-primary"
          onClick={handleJournalClick}
          variant="secondary"
        >
          End of Week Journal
        </Button>
      </Card.Footer>
      {isModalVisible && (
        <EditGoalModal
          show={isModalVisible}
          onHide={handleCloseEditingModal}
          onSubmit={handleGoalSubmit}
          editingGoal={editingGoal}
        />
      )}

      <WeeklyJournalModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmit}
      />
    </Card>
  );
};

export default WeekComponent;
