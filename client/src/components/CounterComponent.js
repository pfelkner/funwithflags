import React, { useEffect, useState } from "react";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import CrisisAlertOutlinedIcon from "@mui/icons-material/CrisisAlertOutlined";
import { green, red, blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CounterComponent = ({
  answers: { correct, incorrect },
  handleGameOver,
}) => {
  const navigate = useNavigate();
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    if (incorrect === 3) {
      handleGameOver();
      axios.get("http://localhost:8080/gameover");
      navigate("/lobby");
    }
  }, [incorrect, navigate]);

  useEffect(() => {
    const totalAttempts = correct + incorrect;
    const newAccuracy = totalAttempts > 0 ? (correct / totalAttempts) * 100 : 0;
    setAccuracy(newAccuracy);
  }, [correct, incorrect]);

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
        <span>{correct}</span>
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
        <span>{incorrect}</span>
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
        <span> {accuracy.toFixed(2)}%</span>
      </div>
    </div>
  );
};

export default CounterComponent;
