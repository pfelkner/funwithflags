import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CounterComponent from "./components/CounterComponent";
import FlagComponent from "./components/FlagComponent";
import GuessComponent from "./components/GuessComponent";
import SolutionComponent from "./components/SolutionComponent";
import getCountry from "./hooks/getCountry";
import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signup/SignUp";

function App() {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [isCorrectGuess, setIsCorrectGuess] = useState(null);
  const [showingResult, setShowingResult] = useState(false);

  const [streakCount, setStreakcount] = useState(0);

  const [country, setCountry] = useState(() => getCountry());
  const initialMount = useRef(true);

  // useEffect(() => {
  //   setCountry(getCountry());
  // }, [correctAnswers, incorrectAnswers]);
  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
    } else {
      setCountry(getCountry());
    }
  }, [correctAnswers, incorrectAnswers]);

  const evaluate = (answer) => {
    setShowingResult(true);
    const isCorrect = answer === country.countryName;
    setIsCorrectGuess(isCorrect);

    delaySetClicked(isCorrect);
  };

  const delaySetClicked = (isCorrect) => {
    setTimeout(() => {
      if (isCorrect) {
        setCorrectAnswers((prev) => prev + 1);
        setStreakcount((prev) => prev + 1);
      } else {
        setIncorrectAnswers((prev) => prev + 1);
        setStreakcount(0);
      }

      setShowingResult(false);
      setIsCorrectGuess(null);
    }, 1000);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/funwithflags"
          element={
            <div>
              <FlagComponent
                countryCode={country.countryCode}
                isCorrectGuess={isCorrectGuess}
              />
              {/* <SolutionComponent solution={country.countryName} /> */}
              <CounterComponent
                correctAnswers={correctAnswers}
                incorrectAnswers={incorrectAnswers}
                streakCount={streakCount}
              />
              <GuessComponent
                buttonLabels={country.countryNames}
                onClick={evaluate}
                solution={country.countryName}
                showingResult={showingResult}
              />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
