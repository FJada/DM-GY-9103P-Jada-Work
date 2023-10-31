import React from 'react';
import { Link } from 'react-router-dom';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import "./styles.css";
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const HomePage = () => {
  return (
    <div className="home-container">
      <div>
      <h1 className="header">Welcome to the Quiz Game</h1>
      <Link to="/quiz">
      <button className="start-button">Start Quiz</button>
    </Link>
      </div>
    <ComposableMap className="world-map">
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              style={{
                default: { fill: "#A0A0A0", outline: "none" },
                hover: { fill: "#FFD700", outline: "none" },
                pressed: { fill: "#FF4500", outline: "none" }
              }}
            />
          ))
        }
      </Geographies>
    </ComposableMap>
    
  </div>
  );
}
export default HomePage;
