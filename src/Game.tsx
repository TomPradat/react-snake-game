import React, { useEffect, useState } from "react";
import Apple from "./Apple";
import { GAME_CONSTANTS } from "./constants";
import tick, { computeNextDirection, GameState } from "./core";
import GridBackground from "./GridBackground";
import Snake from "./Snake";

const { size, numberOfRows } = GAME_CONSTANTS.board;
const tileSize = size / numberOfRows;

enum Directions {
  Right = "Right",
  Top = "Top",
  Left = "Left",
  Bottom = "Bottom",
}

const initialState = {
  snake: [
    { x: 0, y: 5 },
    { x: 1, y: 5 },
    { x: 2, y: 5 },
  ],
  apple: { x: 5, y: 6 },
  direction: Directions.Right,
  isGameOver: false,
};

const Game = () => {
  const [isPaused, setIsPaused] = useState(true);
  const [state, setState] = useState<GameState>(initialState);

  useEffect(() => {
    const changeDirectionHandler = (event: KeyboardEvent) => {
      setState((current) => {
        return {
          ...current,
          direction: computeNextDirection(current, event),
        };
      });
    };

    document.body.addEventListener("keydown", changeDirectionHandler);

    return () => {
      document.body.removeEventListener("keydown", changeDirectionHandler);
    };
  }, []);

  useEffect(() => {
    let intervalId: number;

    if (!isPaused && !state.isGameOver) {
      intervalId = setInterval(() => {
        setState((current) => tick(current, numberOfRows));
      }, 400);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPaused, state.isGameOver]);

  return (
    <div>
      <div className="relative mb-4">
        <GridBackground />
        <Snake tileSize={tileSize} parts={state.snake} />
        {state.apple && <Apple tileSize={tileSize} position={state.apple} />}
        {state.isGameOver && (
          <div className="absolute w-full h-full left-0 top-0 flex items-center justify-center font-bold text-5xl">
            GAME OVER
          </div>
        )}
      </div>
      {state.isGameOver ? (
        <button
          className="bg-green-500 hover:bg-green-600 py-2 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
          onClick={() => {
            setState(initialState);
          }}
        >
          Restart
        </button>
      ) : (
        <button
          className="bg-green-500 hover:bg-green-600 py-2 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? "Play" : "Pause"}
        </button>
      )}
    </div>
  );
};

export default Game;
