import React, { useState } from "react";
import "./App.css";
import Game from "./Game";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
