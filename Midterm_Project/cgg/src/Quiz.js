
import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import {STATES} from './states-data'
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const Quiz = () => {
  // holds single variables and uses usestate hook to set to null at start and is used to re-render the actions of the quiz
  const [selectedState, setSelectedState] = useState(null);
  const [randomState, setRandomState] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  //holds array of states whether correct or not to keep track of previous guesses and correct guesses
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [guessedStates, setGuessedStates] = useState([]);

  // use for filtering out states that have been guessed already and generating random states for the user to guess
  useEffect(() => {
    const availableStates = STATES.names.filter(state => !guessedStates.includes(STATES.names));
    if (availableStates.length > 0) {
      // creates random index to be used to call a random state in the states data array for the use to guess when they guess again
    const randomIndex = Math.floor(Math.random() * STATES.names.length);
    setRandomState(STATES.names[randomIndex]);
    }
}, [correctGuesses]);

  //
  const handleStateClick = (geo) => {
    const clickedState = geo.properties.name;
    
    if (!correctGuesses.includes(clickedState)) {
      setSelectedState(clickedState);

      if (clickedState === randomState) {
        setIsCorrect(true);
        // adds corect  guess to array to be removed from the guessing pool
        setCorrectGuesses([...correctGuesses, clickedState]);

        // sets a new random index for the usser to get a new state
        const randomIndex = Math.floor(Math.random() * STATES.names.length);
        setRandomState(STATES.names[randomIndex]);

        // resets the game after users get the right answer allow users to guess for other states 
          setTimeout(() => {
          setSelectedState(null);
          setIsCorrect(null);
        
        }, 3000);   // resets after 3 secons 
      } else {
        setIsCorrect(false);
      }
      //updates guessed states 
      setGuessedStates([...guessedStates, clickedState]);
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
      
    </div>
  );
};

export default Quiz;

