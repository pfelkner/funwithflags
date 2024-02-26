// MyComponent.js
import React from "react";

const SolutionComponent = ({ solution }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "5vh",
      }}
    >
      <div style={{ margin: "1em" }}>Solution: {solution}</div>
    </div>
  );
};

export default SolutionComponent;
