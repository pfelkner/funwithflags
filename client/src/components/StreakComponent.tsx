// MyComponent.js
import React, { useEffect, useState } from "react";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import { green, red, blue, yellow } from "@mui/material/colors";
import axios from "axios";
import useUser from "../context/_UserContext";

interface StreakComponentProps {
  streakCount: number;
}



const StreakComponent = ({ streakCount }:StreakComponentProps ) => {
  // const [streakCount, setStreakcount] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const userContext = useUser();

  useEffect(() => {
    // Empty function for initial effect
    return () => {
      // This function will be called when the component unmounts
      axios.post('http://localhost:8080/score/update', {
        userId: userContext!.user.id,
        highestStreak: highestStreak,
      })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    };
  }, []);

  useEffect(() => {
    if (streakCount > highestStreak) {
      setHighestStreak(streakCount);
    }
  }, [streakCount]);
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
