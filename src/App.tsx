import React, { useState } from "react";
import Game from "./Game";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{ backgroundColor: "#282c34" }}
      className="min-h-screen flex flex-col items-center justify-center text-white text-center text-xl"
    >
      <Game />
    </div>
  );
}

export default App;
