import React from "react";
import { Directions } from "../core";
import { useSettings } from "../GameSettingsContext";
import Head from "./Head";

type Props = {
  parts: Array<{ x: number; y: number }>;
  direction: Directions;
};

const Snake = ({ parts, direction }: Props) => {
  const {
    board: { speed, tileSize },
    snake: { color: snakeColor },
  } = useSettings();

  return (
    <>
      {parts.map((part, index) => {
        let reduction = tileSize / 5;
        if (index === 0) {
          reduction *= 3;
        } else if (index === 1) {
          reduction *= 2;
        } else if (index === 2) {
          reduction *= 1.5;
        }

        if (index === parts.length - 1) {
          return (
            <Head
              key={parts.length - index}
              part={part}
              direction={direction}
            />
          );
        }

        return (
          <div
            key={parts.length - index}
            className="rounded-full absolute"
            style={{
              width: `${tileSize - reduction}px`,
              height: `${tileSize - reduction}px`,
              left: part.x * tileSize + reduction / 2,
              top: part.y * tileSize + reduction / 2,
              backgroundColor: snakeColor,
              transition: `all ${speed}ms linear`,
            }}
          />
        );
      })}
    </>
  );
};

export default Snake;
