import { useEffect, useState } from "react";
import { getAreaData } from "./api";

import "./App.css";

function App() {
  const [areas, setAreas] = useState([]);
  const [outcode, setOutcode] = useState("bb12");
  const [text, setText] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    const outcodeRegex = /^[a-zA-Z]{1,2}[0-9][a-zA-Z0-9]?$/;
    if (text.match(outcodeRegex)) {
      setOutcode(text);
    } else {
      alert("Incorrect outcode");
    }
  };

  const load = async () => {
    try {
      const areaData = await getAreaData(outcode);
      setAreas(areaData);
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
    </div>
  );
}

export default App;
