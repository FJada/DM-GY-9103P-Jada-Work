import React, { useEffect, useReducer } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Link } from 'react-router-dom';

const initialState = {
  selectedCountry: null,
  randomCountry: null,
  isCorrect: null,
  correctGuesses: [],
  guessedCountries: [],
  incorrectGuesses: 0,
  timer: 90,
  correctGuessCount: 0,
  gameActive: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SELECTED_COUNTRY':
      return { ...state, selectedCountry: action.payload };
    case 'SET_RANDOM_COUNTRY':
      return { ...state, randomCountry: action.payload };
    case 'SET_IS_CORRECT':
      return { ...state, isCorrect: action.payload };
    case 'SET_CORRECT_GUESSES':
      return { ...state, correctGuesses: action.payload };
    case 'SET_GUESSED_COUNTRIES':
      return { ...state, guessedCountries: action.payload };
    case 'SET_INCORRECT_GUESSES':
      return { ...state, incorrectGuesses: action.payload };
    case 'SET_TIMER':
      return { ...state, timer: action.payload };
    case 'SET_CORRECT_GUESS_COUNT':
      return { ...state, correctGuessCount: action.payload };
    case 'SET_GAME_ACTIVE':
      return { ...state, gameActive: action.payload };
    default:
      return state;
  }
};

const QuizModule = ({ geoUrl, countries }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const timerInterval = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [state.timer]);

  useEffect(() => {
    const availableCountries = countries.names.filter(country => !state.guessedCountries.includes(country));
    if (availableCountries.length > 0 && !state.selectedCountry) {
      const randomIndex = Math.floor(Math.random() * availableCountries.length);
      dispatch({ type: 'SET_RANDOM_COUNTRY', payload: availableCountries[randomIndex] });
    }
  }, [state.guessedCountries, state.selectedCountry, countries.names]);

  const handleCountryClick = (geo) => {
    if (!state.gameActive) return;
    const clickedCountry = geo.properties.name;

    if (state.correctGuessCount === countries.names.length) {
      // If the user has guessed all countries, the game is won
    gameWon();
      return;
    }

    if (!state.correctGuesses.includes(clickedCountry)) {
      dispatch({ type: 'SET_SELECTED_COUNTRY', payload: clickedCountry });

      if (clickedCountry === state.randomCountry) {
        dispatch({ type: 'SET_IS_CORRECT', payload: true });
        dispatch({ type: 'SET_CORRECT_GUESSES', payload: [...state.correctGuesses, clickedCountry] });
        dispatch({ type: 'SET_CORRECT_GUESS_COUNT', payload: state.correctGuessCount + 1 });

        setTimeout(() => {
          dispatch({ type: 'SET_SELECTED_COUNTRY', payload: null });
          dispatch({ type: 'SET_IS_CORRECT', payload: null });
        }, 3000);
      } else {
        dispatch({ type: 'SET_IS_CORRECT', payload: false });
        dispatch({ type: 'SET_INCORRECT_GUESSES', payload: state.incorrectGuesses + 1 });

        if (state.incorrectGuesses >= 2) {
          alert("You've made 3 incorrect guesses. Game over!");
          dispatch({ type: 'SET_CORRECT_GUESSES', payload: [] });
          dispatch({ type: 'SET_GUESSED_COUNTRIES', payload: [] });
          dispatch({ type: 'SET_INCORRECT_GUESSES', payload: 0 });
          dispatch({ type: 'SET_CORRECT_GUESS_COUNT', payload: 0 });
          dispatch({ type: 'SET_GAME_ACTIVE', payload: false });
        }
      }

      dispatch({ type: 'SET_GUESSED_COUNTRIES', payload: [...state.guessedCountries, clickedCountry] });
    }
  };

  const updateTimer = () => {
    if (state.timer > 0) {
      dispatch({ type: 'SET_TIMER', payload: state.timer - 1 });
    } else {
      if (state.incorrectGuesses >= 2) {
        alert(`Time's up! You ran out of guesses. You guessed ${state.correctGuessCount} countries correctly.`);
      } else {
        alert(`Time's up! You guessed ${state.correctGuessCount} countries correctly.`);
      }
      dispatch({ type: 'SET_CORRECT_GUESSES', payload: [] });
      dispatch({ type: 'SET_GUESSED_COUNTRIES', payload: [] });
      dispatch({ type: 'SET_INCORRECT_GUESSES', payload: 0 });
      dispatch({ type: 'SET_CORRECT_GUESS_COUNT', payload: 0 });
      dispatch({ type: 'SET_TIMER', payload: 60 });
      dispatch({ type: 'SET_GAME_ACTIVE', payload: true });
    }
  };

  const gameWon = () => {
    const minutes = Math.floor((60 - state.timer) / 60);
    const seconds = (60 - state.timer) % 60;
    alert(`Congratulations! You won!\nTime taken: ${minutes} minutes and ${seconds} seconds\nIncorrect guesses: ${state.incorrectGuesses}`);
  };

  return (
    <div>
       <h2 className="text-2xl font-bold mb-4">Guess the Country</h2>
      {state.randomCountry && <p className="mb-2">Guess: {state.randomCountry}</p>}
      {state.selectedCountry && <p className="mb-2">You selected: {state.selectedCountry}</p>}
      {state.isCorrect !== null && (
        <p className="mb-2">{state.isCorrect ? 'Correct!' : 'Incorrect. Try again!'}</p>
      )}
      <p className="mb-2">Time remaining: {state.timer} seconds</p>
      <p className="mb-2">Incorrect Guesses: {state.incorrectGuesses}</p>

      <ComposableMap projection="geoAlbersUsa" projectionConfig={{ scale: 1100, center: [0, 100] }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => handleCountryClick(geo)}
                style={{
                  default: {
                    fill: state.selectedCountry === geo.properties.name && state.isCorrect
                      ? 'green'
                      : state.correctGuesses.includes(geo.properties.name)
                      ? 'green'
                      : state.selectedCountry === geo.properties.name && !state.isCorrect
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
