import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Game.css";
import GridBackground from "./GridBackground";

export const SIDE_SIZE = 500;

const DIRECTIONS = {
  RIGHT: "RIGHT",
  TOP: "TOP",
  LEFT: "LEFT",
  BOTTOM: "BOTTOM",
};

const Game = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const direction = useRef(DIRECTIONS.RIGHT);

  const tick = useCallback(() => {
    switch (direction.current) {
      case DIRECTIONS.RIGHT: {
        setPosition((previous) => ({ x: previous.x + 1, y: previous.y }));
        break;
      }
      case DIRECTIONS.LEFT: {
        setPosition((previous) => ({ x: previous.x - 1, y: previous.y }));
        break;
      }
      case DIRECTIONS.TOP: {
        setPosition((previous) => ({ x: previous.x, y: previous.y - 1 }));
        break;
      }
      case DIRECTIONS.BOTTOM: {
        setPosition((previous) => ({ x: previous.x, y: previous.y + 1 }));
        break;
      }
    }
  }, []);

  useEffect(() => {
    const changeDirectionHandler = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowRight":
          direction.current = DIRECTIONS.RIGHT;
          break;
        case "ArrowLeft":
          direction.current = DIRECTIONS.LEFT;
          break;
        case "ArrowDown":
          direction.current = DIRECTIONS.BOTTOM;
          break;
        case "ArrowUp":
          direction.current = DIRECTIONS.TOP;
          break;
        default:
      }
    };

    document.body.addEventListener("keydown", changeDirectionHandler);

    return () => {
      document.body.removeEventListener("keydown", changeDirectionHandler);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(tick, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, [tick]);

  return (
    <div className="Game">
      <GridBackground />
      <div
        style={{
          width: `${SIDE_SIZE / 10 - 10}px`,
          height: `${SIDE_SIZE / 10 - 10}px`,
          backgroundColor: "black",
          borderRadius: "50%",
          position: "absolute",
          left: (position.x * SIDE_SIZE) / 10 + 5,
          top: (position.y * SIDE_SIZE) / 10 + 5,
          transition: "all 500ms ease",
        }}
      />
    </div>
  );
};

export default Game;
