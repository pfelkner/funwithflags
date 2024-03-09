import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CounterComponent from "./components/CounterComponent";
import FlagComponent from "./components/FlagComponent";
import GuessComponent from "./components/GuessComponent";
import StreakComponent from "./components/StreakComponent";
import getCountry from "./hooks/getCountry";
import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signup/SignUp";
import LobbyComponent from "./components/LobbyComponent";
import UserContext from "./context/UserContext";
import { pickCountries, pickCountry } from "./hooks/rankCountries";
import test from "./hooks/rankCountries";
import axios from "axios";
import { set } from "lodash";

function App() {
  const [user, setUser] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [isCorrectGuess, setIsCorrectGuess] = useState(null);
  const [accuracy, setAccuracy] = useState(0);

  const [showingResult, setShowingResult] = useState(false);

  const [streakCount, setStreakcount] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);

  const [country, setCountry] = useState(() => getCountry());
  const initialMount = useRef(true);

  const _getCountry = () => {
    axios
      .get("http://localhost:8080/game/start")
      .then((resp) => {
        const data = resp.data;
        console.log(data);
        // return data;
        setCountry(data.options, data.country, data.code);
      })
      .catch((error) => {
        console.error("ERROR".repeat(20));
        console.error(error);
        console.error("ERROR".repeat(20));
      });
  };
  _getCountry();
  // useEffect(async () => {
  //   console.log(_getCountry());
  // }, []);
  // pickCountry();
  // test();
  // useEffect(() => {
  //   if (initialMount.current) {
  //     initialMount.current = false;
  //   } else {
  //     setCountry(getCountry());
  //   }
  // }, [correctAnswers, incorrectAnswers]);

  useEffect(() => {
    const totalAttempts = correctAnswers + incorrectAnswers;
    const newAccuracy =
      totalAttempts > 0 ? (correctAnswers / totalAttempts) * 100 : 0;
    setAccuracy(newAccuracy);
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
        setStreakcount((prev) => {
          const newStreakCount = prev + 1;
          // Use the newStreakCount directly to check against highestStreak
          if (newStreakCount > highestStreak) {
            setHighestStreak(newStreakCount);
          }
          return newStreakCount;
        });
      } else {
        setIncorrectAnswers((prev) => prev + 1);
        setStreakcount(0);
      }

      // axios.post
      setShowingResult(false);
      setIsCorrectGuess(null);
    }, 1000);
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
                <FlagComponent
                  countryCode={country.countryCode}
                  isCorrectGuess={isCorrectGuess}
                />
                {/* <SolutionComponent solution={country.countryName} /> */}
                <CounterComponent
                  correctAnswers={correctAnswers}
                  incorrectAnswers={incorrectAnswers}
                  accuracy={accuracy.toFixed(2)}
                />
                <StreakComponent
                  streakCount={streakCount}
                  highestStreak={highestStreak}
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
    </UserContext.Provider>
  );
}

export default App;
