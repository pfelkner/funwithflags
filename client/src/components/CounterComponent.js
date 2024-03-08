import React from "react";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import CrisisAlertOutlinedIcon from "@mui/icons-material/CrisisAlertOutlined";
import { green, red, blue } from "@mui/material/colors";

const CounterComponent = ({ correctAnswers, incorrectAnswers, accuracy }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "1.2rem",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "1.2rem",
        }}
      >
        <TaskAltOutlinedIcon style={{ color: green[500], fontSize: "2rem" }} />
        <span>{correctAnswers}</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "1.2rem",
        }}
      >
        <DangerousOutlinedIcon style={{ color: red[500], fontSize: "2rem" }} />
        <span>{incorrectAnswers}</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "1.2rem",
        }}
      >
        <CrisisAlertOutlinedIcon
          style={{ color: blue[500], fontSize: "2rem" }}
        />
        <span> {accuracy}%</span>
      </div>
    </div>
  );
};

export default CounterComponent;
