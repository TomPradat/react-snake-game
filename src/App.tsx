import React, { useState } from "react";
import Game from "./Game";
import { SettingsProvider } from "./GameSettingsContext";

function App() {
  return (
    <div
      style={{ backgroundColor: "#282c34" }}
      className="min-h-screen flex flex-col items-center justify-center text-white text-center text-xl"
    >
      <SettingsProvider>
        <Game />
      </SettingsProvider>
    </div>
  );
}

export default App;
