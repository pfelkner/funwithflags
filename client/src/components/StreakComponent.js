// MyComponent.js
import React from "react";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import { green, red, blue, yellow } from "@mui/material/colors";

const StreakComponent = ({ streakCount, highestStreak }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "5vh",
        margin: "1rem",
      }}
    >
      <TimelineOutlinedIcon style={{ color: yellow[800], fontSize: "3rem" }} />
      <div style={{ margin: "1em" }}>{streakCount}</div>
      <AutoGraphOutlinedIcon style={{ color: yellow[800], fontSize: "3rem" }} />
      <div style={{ margin: "1em" }}> {highestStreak}</div>
    </div>
  );
};

export default StreakComponent;
