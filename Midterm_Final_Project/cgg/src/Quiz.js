import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Link } from 'react-router-dom';

const QuizModule = ({ geoUrl, countries, onGameEnd }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [randomCountry, setRandomCountry] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [guessedCountries, setGuessedCountries] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [timer, setTimer] = useState(60);
  const [correctGuessCount, setCorrectGuessCount] = useState(0);
  const [gameActive, setGameActive] = useState(true);

  useEffect(() => {
    const timerInterval = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer]);

  useEffect(() => {
    const availableCountries = countries.filter(country => !guessedCountries.includes(country));
    if (availableCountries.length > 0 && !selectedCountry) {
      const randomIndex = Math.floor(Math.random() * countries.length);
      setRandomCountry(countries[randomIndex]);
    }
  }, [guessedCountries, selectedCountry]);

  const handleCountryClick = (geo) => {
    if (!gameActive) return;
    const clickedCountry = geo.properties.NAME;

    if (!correctGuesses.includes(clickedCountry)) {
      setSelectedCountry(clickedCountry);

      if (clickedCountry === randomCountry) {
        setIsCorrect(true);
        setCorrectGuesses([...correctGuesses, clickedCountry]);
        setCorrectGuessCount(prevCount => prevCount + 1);

        const randomIndex = Math.floor(Math.random() * countries.length);
        setRandomCountry(countries[randomIndex]);

        setTimeout(() => {
          setSelectedCountry(null);
          setIsCorrect(null);
        }, 3000);
      } else {
        setIsCorrect(false);

        setIncorrectGuesses(prevCount => prevCount + 1);

        if (incorrectGuesses >= 2) {
          alert("You've made 3 incorrect guesses. Game over!");
          setCorrectGuesses([]);
          setGuessedCountries([]);
          setIncorrectGuesses(0);
          setCorrectGuessCount(0);
          setGameActive(false);
          onGameEnd();
        }
      }

      setGuessedCountries([...guessedCountries, clickedCountry]);
    }
  };

  const updateTimer = () => {
    if (timer > 0) {
      setTimer(prevTimer => prevTimer - 1);
    } else {
      if (incorrectGuesses >= 2) {
        alert(`Time's up! You ran out of guesses. You guessed ${correctGuessCount} countries correctly.`);
      } else {
        alert(`Time's up! You guessed ${correctGuessCount} countries correctly.`);
      }

      setCorrectGuesses([]);
      setGuessedCountries([]);
      setIncorrectGuesses(0);
      setCorrectGuessCount(0);
      setTimer(60);
      setGameActive(true);
      onGameEnd();
    }
  };

  return (
    <div>
      <h1 className="header">Guess the Country</h1>
      {randomCountry && <p>Guess: {randomCountry}</p>}
      {selectedCountry && <p>You selected: {selectedCountry}</p>}
      {isCorrect !== null && (
        <p>{isCorrect ? 'Correct!' : 'Incorrect. Try again!'}</p>
      )}
      <p>Time remaining: {timer} seconds</p>
      <p>Incorrect Guesses: {incorrectGuesses}</p>
      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 250 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => handleCountryClick(geo)}
                style={{
                  default: {
                    fill: selectedCountry === geo.properties.NAME && isCorrect
                      ? 'green'
                      : correctGuesses.includes(geo.properties.NAME)
                      ? 'green'
                      : selectedCountry === geo.properties.NAME && !isCorrect
                      ? 'red'
                      : '#ECEFF1',
                    stroke: '#607D8B',
                    strokeWidth: 0.75,
                    outline: 'none',
                  },
                  hover: {
                    fill: '#FFEB3B',
                    stroke: '#607D8B',
                    strokeWidth: 0.75,
                    outline: 'none',
                  },
                  pressed: {
                    fill: '#FF5722',
                    stroke: '#607D8B',
                    strokeWidth: 0.75,
                    outline: 'none',
                  },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
      <Link to="/">
        <button className="start-button">Quit</button>
      </Link>
    </div>
  );
};

export default QuizModule;