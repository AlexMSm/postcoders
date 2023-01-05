import { useEffect, useState } from "react";
import { getAreaData } from "./api";

import "./App.css";
import BasicCard from "./Components/BasicCard";

function App() {
  const [areas, setAreas] = useState([]);
  const [outcode, setOutcode] = useState("BB12");
  const [text, setText] = useState("");
  const [cache, setCache] = useState({});

  const onSubmit = (event) => {
    const textUpper = text.toUpperCase();
    event.preventDefault();
    const outcodeRegex = /^[a-zA-Z]{1,2}[0-9][a-zA-Z0-9]?$/;

    if (Object.keys(cache).includes(textUpper)) {
      // Cache check
      setAreas(cache[textUpper]);
      setOutcode(textUpper);
    } else if (text.match(outcodeRegex)) {
      setOutcode(textUpper);
    } else {
      alert("Incorrect outcode format");
    }
  };

  const load = async () => {
    try {
      const areaData = await getAreaData(outcode);

      setAreas(() => {
        // Caching
        const newCache = { ...cache };
        newCache[outcode] = areaData;
        setCache(newCache);
        return areaData;
      });
    } catch (error) {
      window.alert(error);
      setAreas([]);
    }
  };

  useEffect(() => {
    load();
  }, [outcode]);

  return (
    <div className="App">
      <h1>Postcoders</h1>
      <form className="postcode-form" onSubmit={onSubmit}>
        <h2>Please enter a valid uk postcode outward code e.g BB12</h2>
        <input
          className="postcode-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onSubmit={onSubmit}
        />
        <button className="postcode-submit-btn">Submit</button>
      </form>
      <h2>{`Areas for ${outcode}: ${areas.length}`}</h2>
      <div className="card-container">
        {areas.map((area) => {
          return (
            <BasicCard
              key={`${outcode}-${area["place name"]}`}
              name={area["place name"]}
              longitude={area.longitude}
              latitude={area.latitude}
              country={area.state}
              countryCode={area["state abbreviation"]}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
