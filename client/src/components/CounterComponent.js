// MyComponent.js
import React from "react";

const CounterComponent = ({ correctAnswers, incorrectAnswers }) => {
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
    </div>
  );
};

export default CounterComponent;
