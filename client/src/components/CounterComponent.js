// MyComponent.js
import React from "react";

const CounterComponent = ({
  correctAnswers,
  incorrectAnswers,
  streakCount,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "5vh",
      }}
    >
      <div style={{ margin: "1em" }}>Correct Answers: {correctAnswers}</div>
      <div style={{ margin: "1em" }}>Incorrect Answers: {incorrectAnswers}</div>
      <p>Streak: {streakCount} </p>
    </div>
  );
};

export default CounterComponent;
