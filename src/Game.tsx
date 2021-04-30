import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import Apple from "./Apple";
import { GAME_CONSTANTS } from "./constants";
import tick, { computeNextDirection, Directions, GameState } from "./core";
import GridBackground from "./GridBackground";
import { getHighestScore, registerScore } from "./score";
import Snake from "./Snake/Snake";

const { size, numberOfRows, speed } = GAME_CONSTANTS.board;
const tileSize = size / numberOfRows;

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

const keyDirectionMapping: Record<string, Directions> = {
  ArrowRight: Directions.Right,
  ArrowLeft: Directions.Left,
  ArrowDown: Directions.Bottom,
  ArrowUp: Directions.Top,
};

const Game = () => {
  const [isPaused, setIsPaused] = useState(true);
  const [state, setState] = useState<GameState>(initialState);

  useEffect(() => {
    const changeDirectionHandler = (event: KeyboardEvent) => {
      setState((current) => ({
        ...current,
        direction: computeNextDirection(
          current,
          keyDirectionMapping[event.key]
        ),
      }));
    };

    if (!state.isGameOver) {
      document.body.addEventListener("keydown", changeDirectionHandler);
    }

    return () => {
      document.body.removeEventListener("keydown", changeDirectionHandler);
    };
  }, [state.isGameOver]);

  useEffect(() => {
    let intervalId: number;

    if (!isPaused && !state.isGameOver) {
      intervalId = setInterval(() => {
        setState((current) => tick(current, numberOfRows));
      }, speed);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPaused, state.isGameOver]);

  useEffect(() => {
    if (state.isGameOver) {
      registerScore(state.snake.length);
    }
  }, [state.isGameOver]);

  const handleSwipe = React.useCallback((direction: Directions) => {
    setState((current) => ({
      ...current,
      direction: computeNextDirection(current, direction),
    }));
  }, []);

  const swipeEventsHandler = useSwipeable({
    onSwipedDown: () => handleSwipe(Directions.Bottom),
    onSwipedLeft: () => handleSwipe(Directions.Left),
    onSwipedRight: () => handleSwipe(Directions.Right),
    onSwipedUp: () => handleSwipe(Directions.Top),
  });

  return (
    <div>
      <div className="text-right p-2">Highest score : {getHighestScore()}</div>
      <div {...swipeEventsHandler} className="relative mb-4">
        <GridBackground />
        <Snake
          tileSize={tileSize}
          parts={state.snake}
          direction={state.direction}
        />
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
