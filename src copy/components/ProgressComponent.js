import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import WeekComponent from "./WeekComponent";

const ProgressComponent = () => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [dateRange, setDateRange] = useState("");
  const [weeklyGoals, setWeeklyGoals] = useState({});

  useEffect(() => {
    setDateRange(getDateRangeForWeek(currentWeek));
  }, [currentWeek]);

  function getDateRangeForWeek(weekNumber) {
    const startDate = new Date("12/31/2023");
    startDate.setDate(startDate.getDate() + (weekNumber - 1) * 7); // Adjust to the correct week
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6); // The end date of the week

    return `${
      startDate.getMonth() + 1
    }/${startDate.getDate()}/${startDate.getFullYear()} - ${
      endDate.getMonth() + 1
    }/${endDate.getDate()}/${endDate.getFullYear()}`;
  }

  const handleNextWeek = () => {
    const newWeek = currentWeek + 1;
    setCurrentWeek(newWeek);

    // Check if the next week's goals are already initialized
    if (!weeklyGoals[newWeek]) {
      setWeeklyGoals((prevGoals) => ({
        ...prevGoals,
        // Copy goals from the current week, resetting their status
        [newWeek]: prevGoals[currentWeek]
          ? prevGoals[currentWeek].map((goal) => ({
              ...goal,
              status: "not started",
            }))
          : [],
      }));
    }
  };

  const handlePreviousWeek = () => {
    if (currentWeek > 1) {
      setCurrentWeek(currentWeek - 1);
    }
  };

  return (
    <Card className="mb-3">
      <Card.Header>
        {" "}
        <h2>Week {currentWeek}</h2>
        <h3>{dateRange}</h3>
        {currentWeek > 1 && (
          <Button onClick={handlePreviousWeek} variant="link">
            Previous Week
          </Button>
        )}
        <Button onClick={handleNextWeek} variant="link">
          Next Week
        </Button>
      </Card.Header>
      <Card.Body>
        <WeekComponent
          goals={weeklyGoals[currentWeek] || []}
          setGoals={(goals) =>
            setWeeklyGoals({ ...weeklyGoals, [currentWeek]: goals })
          }
        />
      </Card.Body>
    </Card>
  );
};

export default ProgressComponent;
