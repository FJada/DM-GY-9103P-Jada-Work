import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const WorldMap = () => {
  return (
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              style={{
                default: { fill: "#D6D6DA", outline: "none" },
                hover: { fill: "#F53", outline: "none" },
                pressed: { fill: "#E42", outline: "none" }
              }}
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
};

export default WorldMap;
