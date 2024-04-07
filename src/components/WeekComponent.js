import React, { useState } from "react";
import EditGoalModal from "./EditGoalModal";
import GoalComponent from "./GoalComponent";
import WeeklyJournalModal from "./WeeklyJournalModal";
import { Button, Container } from "react-bootstrap";
import PercentComponent from "./PercentComponent";
import ConfirmModal from "./ConfirmModal";

const WeekComponent = ({ goals, setGoals }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null); // State to track the goal being edited
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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
    setShowConfirmModal(false);
  };

  const handleConfirmDelete = () => {
    setShowConfirmModal(true);
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
    <Container>
      <h1 class="d-flex justify-content-end">
        {" "}
        <Button onClick={() => setIsModalVisible(true)}>Add Goal</Button>
        <Button
          className="btn btn-primary"
          onClick={handleJournalClick}
          variant="secondary"
          style={{ marginLeft: "10px" }}
        >
          Journal
        </Button>
      </h1>
      <div>
        {goals.map((goal) => (
          <GoalComponent
            key={goal.id}
            goal={goal}
            updateStatus={updateGoalStatus}
            onEdit={() => handleEditGoal(goal)}
            onDelete={() => handleConfirmDelete()}
          />
        ))}
      </div>
      <div>
        <PercentComponent goals={goals} />
      </div>
      {isModalVisible && (
        <EditGoalModal
          show={isModalVisible}
          onHide={handleCloseEditingModal}
          onSubmit={handleGoalSubmit}
          editingGoal={editingGoal}
        />
      )}
      {goals.map((goal) => (
        <ConfirmModal
          show={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={() => handleDeleteGoal(goal.id)}
          message="Are you sure you want to delete this item?"
        />
      ))}

      <WeeklyJournalModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default WeekComponent;
