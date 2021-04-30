import React from "react";
import { GAME_CONSTANTS } from "../constants";
import { Directions } from "../core";
import Head from "./Head";

const { speed } = GAME_CONSTANTS.board;

type Props = {
  tileSize: number;
  parts: Array<{ x: number; y: number }>;
  direction: Directions;
};

const Snake = ({ tileSize, parts, direction }: Props) => {
  return (
    <>
      {parts.map((part, index) => {
        let reduction = 10;
        if (index === 0) {
          reduction += 10;
        } else if (index === 1) {
          reduction += 5;
        }

        if (index === parts.length - 1) {
          return (
            <Head
              key={parts.length - index}
              tileSize={tileSize}
              part={part}
              direction={direction}
            />
          );
        }

        return (
          <div
            key={parts.length - index}
            className="bg-blue-900 rounded-full absolute"
            style={{
              width: `${tileSize - reduction}px`,
              height: `${tileSize - reduction}px`,
              left: part.x * tileSize + reduction / 2,
              top: part.y * tileSize + reduction / 2,
              transition: `all ${speed}ms linear`,
            }}
          />
        );
      })}
    </>
  );
};

export default Snake;
