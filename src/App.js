import React, { useState } from "react";
import "./App.css";
import CounterComponent from "./components/CounterComponent";
import FlagComponent from "./components/FlagComponent";
import GuessComponent from "./components/GuessComponent";
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
      console.log(randomIndex);
      randomEntries.push(randomIndex);
    }
    return randomEntries;
  };

  const randomEntries = getRandomEntries();

  const countryNames = randomEntries.map((index) => values[index]);
  const countryCodes = randomEntries.map((index) => keys[index]);
  const randomIndex = Math.floor(Math.random() * 4);
  const countryCode = countryCodes[randomIndex];
  const countryName = countryNames[randomIndex];

  const handleButtonClick = (buttonLabel) => {
    if (countryName === buttonLabel) setCorrectAnswers(correctAnswers + 1);
    else setIncorrectAnswers(incorrectAnswers + 1);

    console.log(correctAnswers, incorrectAnswers);
  };

  return (
    <div>
      <FlagComponent countryCode={countryCode} />
      <CounterComponent
        correctAnswers={correctAnswers}
        incorrectAnswers={incorrectAnswers}
      />
      <GuessComponent
        buttonLabels={countryNames}
        onButtonClick={handleButtonClick}
      />
    </div>
  );
}

export default App;
