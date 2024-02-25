import React, { useState, useEffect } from "react";
import "./App.css";
import CounterComponent from "./components/CounterComponent";
import FlagComponent from "./components/FlagComponent";
import GuessComponent from "./components/GuessComponent";
import SolutionComponent from "./components/SolutionComponent";
import getCountry from "./hooks/getCountry";

function App() {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [isCorrectGuess, setIsCorrectGuess] = useState(null);
  const [showingResult, setShowingResult] = useState(false);

  const [country, setCountry] = useState(getCountry());

  useEffect(() => {
    setCountry(getCountry());
  }, [correctAnswers, incorrectAnswers]);

  const evaluate = (answer) => {
    setShowingResult(true);
    const isCorrect = answer === country.countryName;
    setIsCorrectGuess(isCorrect);

    delaySetClicked(isCorrect);
  };

  const delaySetClicked = (isCorrect) => {
    setTimeout(() => {
      if (isCorrect) setCorrectAnswers(correctAnswers + 1);
      else setIncorrectAnswers(incorrectAnswers + 1);
      setShowingResult(false);
      setIsCorrectGuess(null);
    }, 1000);
  };

  return (
    <div>
      <FlagComponent
        countryCode={country.countryCode}
        isCorrectGuess={isCorrectGuess}
      />
      <SolutionComponent solution={country.countryName} />
      <CounterComponent
        correctAnswers={correctAnswers}
        incorrectAnswers={incorrectAnswers}
      />
      <GuessComponent
        buttonLabels={country.countryNames}
        onClick={evaluate}
        solution={country.countryName}
        showingResult={showingResult}
      />
    </div>
  );
}

export default App;
