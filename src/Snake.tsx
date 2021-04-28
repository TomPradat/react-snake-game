import React from "react";
import { GAME_CONSTANTS } from "./constants";

const { speed } = GAME_CONSTANTS.board;

type Props = {
  tileSize: number;
  parts: Array<{ x: number; y: number }>;
};

const Snake = ({ tileSize, parts }: Props) => {
  return (
    <>
      {parts.map((part, index) => {
        let reduction = 10;
        if (index === 0) {
          reduction += 10;
        } else if (index === 1) {
          reduction += 5;
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
