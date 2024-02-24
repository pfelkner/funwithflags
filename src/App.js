import React, { useState } from "react";
import "./App.css";
import CounterComponent from "./components/CounterComponent";
import FlagComponent from "./components/FlagComponent";
import GuessComponent from "./components/GuessComponent";
import SolutionComponent from "./components/SolutionComponent";
import data from "./countries.json";

function App() {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);

  const countries = data.countries;
  const keys = Object.keys(countries);
  const values = Object.values(countries);

  const getRandomEntries = () => {
    let randomEntries = [];
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * keys.length);
      randomEntries.push(randomIndex);
    }
    return randomEntries;
  };

  const [randomEntries, setRandomEntries] = useState(getRandomEntries());

  const countryNames = randomEntries.map((index) => values[index]);
  const countryCodes = randomEntries.map((index) => keys[index]);
  const randomIndex = Math.floor(Math.random() * 4);
  const countryCode = countryCodes[randomIndex];
  const countryName = countryNames[randomIndex];

  const evaluate = (isCorrect) => {
    if (isCorrect) setCorrectAnswers(correctAnswers + 1);
    else setIncorrectAnswers(incorrectAnswers + 1);
    setRandomEntries(getRandomEntries());
  };

  return (
    <div>
      <FlagComponent countryCode={countryCode} correctGuess={true} />
      {/* <SolutionComponent solution={solution} /> */}
      <CounterComponent
        correctAnswers={correctAnswers}
        incorrectAnswers={incorrectAnswers}
      />
      <GuessComponent
        buttonLabels={countryNames}
        onGuess={evaluate}
        solution={countryName}
      />
    </div>
  );
}

export default App;
