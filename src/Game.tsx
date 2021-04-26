import React, { useEffect, useState } from "react";
import Apple from "./Apple";
import { GAME_CONSTANTS } from "./constants";
import tick, { computeNextDirection, GameState } from "./core";
import "./Game.css";
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
      <div className="Game">
        <GridBackground />
        <Snake tileSize={tileSize} parts={state.snake} />
        {state.apple && <Apple tileSize={tileSize} position={state.apple} />}
        {state.isGameOver && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              left: "0px",
              display: "flex",
              top: "0px",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "3rem",
              fontWeight: "bold",
            }}
          >
            GAME OVER
          </div>
        )}
      </div>
      {state.isGameOver ? (
        <button
          onClick={() => {
            setState(initialState);
          }}
        >
          Restart
        </button>
      ) : null}
      <button onClick={() => setIsPaused(!isPaused)}>
        {isPaused ? "Play" : "Pause"}
      </button>
    </div>
  );
};

export default Game;
