import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";

function LobbyComponent() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [leader, setLeader] = useState(null);

  const handlePlayClick = () => {
    navigate("/funwithflags");
  };

  useEffect(() => {
    const fetchData = async () => {
      const users = await axios.get("http://localhost:8080/user");
      const scores = await axios.get("http://localhost:8080/score");
      const highscore = scores.data.sort(
        (a, b) => b.highestStreak - a.highestStreak
      )[0];
      const highscoreUser = users.data.find((u) => u.id === highscore.userId);
      console.log(highscoreUser.name);
      console.log(highscore.highestStreak);
      const leader = {
        name: highscoreUser.name,
        streak: highscore.highestStreak,
      };
      setLeader(leader);
    };
    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>Welcome {user?.name} to the Flag Guessing Game!</h1>
      {leader ? (
        <h2>
          Current leader is {leader.name} with a streak of {leader.streak}
        </h2>
      ) : null}
      <Button variant="contained" color="primary" onClick={handlePlayClick}>
        Play
      </Button>
    </div>
  );
}

export default LobbyComponent;
