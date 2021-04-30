import React from "react";
import { GAME_CONSTANTS } from "../constants";
import { Directions } from "../core";

const { speed } = GAME_CONSTANTS.board;

type Props = {
  direction: Directions;
  tileSize: number;
  part: { x: number; y: number };
};

const Head = ({ tileSize, direction, part }: Props) => {
  let reduction = 10;

  let leftEyeClasses;
  let rightEyeClasses;

  switch (direction) {
    case Directions.Bottom:
      leftEyeClasses = "bottom-2 right-2";
      rightEyeClasses = "bottom-2 left-2";
      break;
    case Directions.Top:
      leftEyeClasses = "top-2 left-2";
      rightEyeClasses = "top-2 right-2";
      break;
    case Directions.Left:
      leftEyeClasses = "bottom-2 left-2";
      rightEyeClasses = "top-2 left-2";
      break;
    case Directions.Right:
      leftEyeClasses = "top-2 right-2";
      rightEyeClasses = "bottom-2 right-2";
      break;
  }

  return (
    <div
      className="bg-blue-900 rounded-full absolute"
      style={{
        width: `${tileSize - reduction}px`,
        height: `${tileSize - reduction}px`,
        left: part.x * tileSize + reduction / 2,
        top: part.y * tileSize + reduction / 2,
        transition: `all ${speed}ms linear`,
      }}
    >
      <div
        className={`bg-white rounded-full absolute ${leftEyeClasses} z-10 w-1 h-1`}
      ></div>
      <div
        className={`bg-white rounded-full absolute ${rightEyeClasses} z-10 w-1 h-1`}
      ></div>
    </div>
  );
};

export default Head;
