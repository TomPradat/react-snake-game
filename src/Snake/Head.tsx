import React from "react";
import { Directions } from "../core";
import { useSettings } from "../GameSettingsContext";

type Props = {
  direction: Directions;
  part: { x: number; y: number };
};

const Head = ({ direction, part }: Props) => {
  const {
    board: { speed, tileSize },
    snake: { color: snakeColor },
  } = useSettings();

  let reduction = tileSize / 5;

  let leftEyeStyle;
  let rightEyeStyle;

  switch (direction) {
    case Directions.Bottom:
      leftEyeStyle = { bottom: reduction, right: reduction };
      rightEyeStyle = { bottom: reduction, left: reduction };
      break;
    case Directions.Top:
      leftEyeStyle = { top: reduction, left: reduction };
      rightEyeStyle = { top: reduction, right: reduction };
      break;
    case Directions.Left:
      leftEyeStyle = { bottom: reduction, left: reduction };
      rightEyeStyle = { top: reduction, left: reduction };
      break;
    case Directions.Right:
      leftEyeStyle = { top: reduction, right: reduction };
      rightEyeStyle = { bottom: reduction, right: reduction };
      break;
  }

  return (
    <div
      className="rounded-full absolute"
      style={{
        width: `${tileSize - reduction}px`,
        height: `${tileSize - reduction}px`,
        left: part.x * tileSize + reduction / 2,
        top: part.y * tileSize + reduction / 2,
        backgroundColor: snakeColor,
        transition: `all ${speed}ms linear`,
      }}
    >
      <div
        className={`bg-white rounded-full absolute z-10`}
        style={{
          ...leftEyeStyle,
          width: tileSize / 10,
          height: tileSize / 10,
        }}
      ></div>
      <div
        className={`bg-white rounded-full absolute z-10`}
        style={{
          ...rightEyeStyle,
          width: tileSize / 10,
          height: tileSize / 10,
        }}
      ></div>
    </div>
  );
};

export default Head;
