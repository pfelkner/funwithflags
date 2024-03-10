import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CounterComponent from "./components/CounterComponent";
import FlagComponent from "./components/FlagComponent";
import GuessComponent from "./components/GuessComponent";
import StreakComponent from "./components/StreakComponent";
import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signup/SignUp";
import LobbyComponent from "./components/LobbyComponent";
import UserContext from "./context/UserContext";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [answers, setAnswers] = useState({ correct: 0, incorrect: 0 });
  const [isCorrectGuess, setIsCorrectGuess] = useState(null);

  const [showingResult, setShowingResult] = useState(false);

  const [streakCount, setStreakcount] = useState(0);

  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const initialMount = useRef(true);
  const _getCountry = () => {
    setLoading(true);
    axios
      .get("http://localhost:8080/game/start")
      .then((resp) => {
        const data = resp.data;
        const countryData = {
          countryNames: data.options,
          countryName: data.country,
          countryCode: data.code,
        };

        setCountry(countryData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("ERROR".repeat(20));
        console.error(error);
      });
  };

  useEffect(() => {
    _getCountry();
  }, []);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
    } else {
      setCountry(_getCountry());
    }
  }, [answers.correct, answers.incorrect]);

  useEffect(() => {
    setStreakcount((prev) => prev + 1);
  }, [answers.correct]);

  useEffect(() => {
    setStreakcount(0);
  }, [answers.incorrect]);

  const handleGameOver = () => {
    setAnswers({ correct: 0, incorrect: 0 });
  };

  const evaluate = (isCorrect) => {
    axios
      .post("http://localhost:8080/game/guess", {
        guess: isCorrect,
      })
      .then((response) => {
        console.log(response.data);
        setIsCorrectGuess(isCorrect);
        setTimeout(() => {
          isCorrect
            ? setAnswers((prev) => ({ ...prev, correct: prev.correct + 1 }))
            : setAnswers((prev) => ({
                ...prev,
                incorrect: prev.incorrect + 1,
              }));
          setShowingResult(false);
          setIsCorrectGuess(null);
        }, 800);
      })
      .catch();
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/lobby" element={<LobbyComponent />} />
          <Route
            path="/funwithflags"
            element={
              <div>
                {!loading && (
                  <FlagComponent
                    countryCode={country.countryCode}
                    isCorrectGuess={isCorrectGuess}
                  />
                )}
                <CounterComponent
                  answers={answers}
                  handleGameOver={handleGameOver}
                />
                <StreakComponent streakCount={streakCount} />
                {!loading && (
                  <GuessComponent
                    buttonLabels={country.countryNames}
                    onClick={evaluate}
                    solution={country.countryName}
                  />
                )}
              </div>
            }
          />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
