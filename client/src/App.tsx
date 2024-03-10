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

interface Answers {
  correct: number;
  incorrect: number;
}

interface Country {
  name: string;
  code: string;
  options: string[];
}



function App() {
  const [user, setUser] = useState<any>(null); // TODO: define user type
  const [answers, setAnswers] = useState<Answers>({ correct: 0, incorrect: 0 });
  const [isCorrectGuess, setIsCorrectGuess] = useState<boolean|null>(null);
  const [streak, setStreak] = useState<number>(0);

  const [country, setCountry] = useState<Country |null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const prevCorrect = useRef<number>(0);
  const prevIncorrect = useRef<number>(0);
  // const initialMount = useRef(true); maybe make use to avoid unnecessary rerenders
  const getCountry = () => {
    setLoading(true);
    axios
      .get("http://localhost:8080/game/start")
      .then((resp) => {
        const data = resp.data;
        setCountry(data);
        setLoading(false);
      })
      .catch((error) => {
        //TODO
        console.error(error);
      });
  };

  useEffect(() => {
    getCountry();
  }, []);

  useEffect(() => {
    if (answers.correct !== prevCorrect.current) {
      setStreak((prev) => prev + 1);
    } else if (answers.incorrect !== prevIncorrect.current) {
      setStreak(0);
    }

    prevCorrect.current = answers.correct;
    prevIncorrect.current = answers.incorrect;
    setIsCorrectGuess(null);
  }, [answers]);

  const handleGameOver = () => {
    setAnswers({ correct: 0, incorrect: 0 });
  };

  const processGuess = (isCorrect: boolean) => {
    setIsCorrectGuess(isCorrect);
    setTimeout(() => {
      isCorrect
        ? setAnswers((prev) => ({ ...prev, correct: prev.correct + 1 }))
        : setAnswers((prev) => ({
            ...prev,
            incorrect: prev.incorrect + 1,
          }));
      getCountry();
    }, 800);
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
                    countryCode={country!.code}
                    isCorrectGuess={isCorrectGuess}
                  />
                )}
                <CounterComponent
                  answers={answers}
                  handleGameOver={handleGameOver}
                />
                <StreakComponent streakCount={streak} />
                {!loading && (
                  <GuessComponent
                    buttonLabels={country!.options}
                    onClick={processGuess}
                    solution={country!.name}
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
