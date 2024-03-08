import data from "./../countries.json";
let previousCountries = [];

const getRandom = (ceil) => {
  return Math.floor(Math.random() * ceil);
};

function getCountry() {
  const countries = data.countries;
  const keys = Object.keys(countries);
  const values = Object.values(countries);

  const getRandomEntries = () => {
    let randomEntries = [];
    for (let i = 0; randomEntries.length < 4; i++) {
      const randomIndex = getRandom(keys.length);
      if (
        !randomEntries.includes(randomIndex) &&
        !previousCountries.includes(randomIndex)
      ) {
        randomEntries.push(randomIndex);
      }
    }

    return randomEntries;
  };

  const randomEntries = getRandomEntries();

  const countryNames = randomEntries.map((index) => values[index]);
  const countryCodes = randomEntries.map((index) => keys[index]);
  const randomIndex = getRandom(4);
  const countryCode = countryCodes[randomIndex];
  const countryName = countryNames[randomIndex];
  previousCountries.push(randomEntries[randomIndex]);

  return { countryNames, countryName, countryCode };
}

export default getCountry;
