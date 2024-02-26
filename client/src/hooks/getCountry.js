import { useState, useEffect } from "react";
import data from "./../countries.json";

function getCountry() {
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

  const randomEntries = getRandomEntries();

  const countryNames = randomEntries.map((index) => values[index]);
  const countryCodes = randomEntries.map((index) => keys[index]);
  const randomIndex = Math.floor(Math.random() * 4);
  const countryCode = countryCodes[randomIndex];
  const countryName = countryNames[randomIndex];

  return { countryNames, countryName, countryCode };
}

export default getCountry;
