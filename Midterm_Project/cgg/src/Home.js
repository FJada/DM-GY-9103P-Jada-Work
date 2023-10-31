import React from 'react';
import { Link } from 'react-router-dom';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
//import WorldMap from './WorldMap';


const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


// const WorldMap = () => {
//   return (
//     <ComposableMap>
//       <Geographies geography={geoUrl}>
//         {({ geographies }) =>
//           geographies.map(geo => (
//             <Geography
//               key={geo.rsmKey}
//               geography={geo}
//               style={{
//                 default: { fill: "#D6D6DA", outline: "none" },
//                 hover: { fill: "#F53", outline: "none" },
//                 pressed: { fill: "#E42", outline: "none" }
//               }}
//             />
//           ))
//         }
//       </Geographies>
//     </ComposableMap>
//   );
// };



const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Quiz Game</h1>
     

      <ComposableMap>
      <Geographies geography="">
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
    </ComposableMap>
      <Link to="/quiz">
        <button>Start Quiz</button>
      </Link>
    </div>
  );
}

export default HomePage;
