import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";

function LobbyComponent() {
  const navigate = useNavigate();
  const { user } : any = useContext(UserContext);
  const [leaders, setLeader]:any = useState(null);

  const handlePlayClick = () => {
    navigate("/funwithflags");
  };

  useEffect(() => {
    const fetchData = async () => {
      const users = await axios.get("http://localhost:8080/user");
      const scores = await axios.get("http://localhost:8080/score");
      const highscores = scores.data.slice(0, 3);
      const leaders = highscores.map((score:any) => {
        const user = users.data.find((u:any) => u.id === score.userId);
        return { name: user.name, streak: score.highestStreak };
      });
      setLeader(leaders);
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
      {leaders
        ? leaders.map((leader:any, index:number) => (
            <h2 key={index}>
              {index + 1}. place: {leader.name} with a streak of&nbsp;
              {leader.streak}
            </h2>
          ))
        : null}
      <Button variant="contained" color="primary" onClick={handlePlayClick}>
        Play
      </Button>
    </div>
  );
}

export default LobbyComponent;
