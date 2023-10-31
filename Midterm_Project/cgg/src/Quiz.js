import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import {STATES} from './states-data';
import { Link } from 'react-router-dom';

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const Quiz = () => {
  // holds single variables and uses usestate hook to set to null at start and is used to re-render the actions of the quiz
  const [selectedState, setSelectedState] = useState(null);
  const [randomState, setRandomState] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  //holds array of states whether correct or not to keep track of previous guesses and correct guesses
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [guessedStates, setGuessedStates] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [timer, setTimer] = useState(60); // Set timer to 60 seconds initially
  const [correctGuessCount, setCorrectGuessCount] = useState(0);
 



  // used to initalize a time that counts down from 1 minute 
  useEffect(() => {
    const timerInterval = setInterval(updateTimer, 1000);
    
  
    // This cleanup function will clear the timer interval when the component unmounts
    return () => {
      clearInterval(timerInterval);
    };
  }, [timer]);
  
  // use for filtering out states that have been guessed already and generating random states for the user to guess
  useEffect(() => {
    const availableStates = STATES.names.filter(state => !guessedStates.includes(state));
    if (availableStates.length > 0 && !selectedState) {
      const randomIndex = Math.floor(Math.random() * STATES.names.length);
      setRandomState(STATES.names[randomIndex]);
    }
  }, [guessedStates, selectedState]);


  const handleStateClick = (geo) => {
    const clickedState = geo.properties.name;
  
    if (!correctGuesses.includes(clickedState)) {
      setSelectedState(clickedState);
  
      if (clickedState === randomState) {
          // adds corect  guess to array to be removed from the guessing pool
        setIsCorrect(true);
        setCorrectGuesses([...correctGuesses, clickedState]);
        
        // Increment correct guess count
      setCorrectGuessCount(prevCount => prevCount + 1);

        const randomIndex = Math.floor(Math.random() * STATES.names.length);
        setRandomState(STATES.names[randomIndex]);
   // resets the game after users get the right answer allow users to guess for other states 
        setTimeout(() => {
          setSelectedState(null);
          setIsCorrect(null);
        }, 3000);
      } else {
        setIsCorrect(false);
  
        // Increment incorrect guesses count
        setIncorrectGuesses(prevCount => prevCount + 1);
  
        if (incorrectGuesses === 2) {
          // Game ends after 3 incorrect guesses
          alert("You've made 3 incorrect guesses. Game over!");
          // Reset the game
          setCorrectGuesses([]);
          setGuessedStates([]);
          setIncorrectGuesses(0);
          setCorrectGuessCount(0);

        }
      }
      //updates guessed states 
      setGuessedStates([...guessedStates, clickedState]);
    }
  };
  
  

  const updateTimer = () => {
    if (timer > 0) {
      setTimer(prevTimer => prevTimer - 1);
    } else {
      if (incorrectGuesses >= 2) {
        alert(`Time's up! You ran out of guesses. You guessed ${correctGuessCount} states correctly.`);
      } else {
        alert(`Time's up! You guessed ${correctGuessCount} states correctly.`);
      }

      // Reset the game
    setCorrectGuesses([]);
    setGuessedStates([]);
    setIncorrectGuesses(0);
    setCorrectGuessCount(0);
    setTimer(60);

    }
  };

  return (
    <div>
      <h1>Guess the U.S. State</h1>
     
      {randomState && <p>Guess: {randomState}</p>}
      
      {selectedState && <p>You selected: {selectedState}</p>}
      {isCorrect !== null && (
        <p>{isCorrect ? 'Correct!' : 'Incorrect. Try again!'}</p>
      )}
       <p>Time remaining: {timer} seconds</p>
       <p>Incorrect Guesses: {incorrectGuesses}</p>

      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => handleStateClick(geo)}
                style={{
                  default: {
                    fill: selectedState === geo.properties.name && isCorrect
                    ? 'green'
                    : correctGuesses.includes(geo.properties.name)
                    ? 'green'
                    : selectedState === geo.properties.name && !isCorrect
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
        <button>Quit</button>
      </Link>
    
      
    </div>
  );
};

export default Quiz;

