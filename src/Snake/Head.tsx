import React from "react";
import { Directions } from "../kernel";
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

  let padding = tileSize / 5;

  let leftEyeStyle;
  let rightEyeStyle;

  switch (direction) {
    case Directions.Bottom:
      leftEyeStyle = { bottom: padding, right: padding };
      rightEyeStyle = { bottom: padding, left: padding };
      break;
    case Directions.Top:
      leftEyeStyle = { top: padding, left: padding };
      rightEyeStyle = { top: padding, right: padding };
      break;
    case Directions.Left:
      leftEyeStyle = { bottom: padding, left: padding };
      rightEyeStyle = { top: padding, left: padding };
      break;
    case Directions.Right:
      leftEyeStyle = { top: padding, right: padding };
      rightEyeStyle = { bottom: padding, right: padding };
      break;
  }

  return (
    <div
      className="rounded-full absolute"
      style={{
        width: `${tileSize - padding}px`,
        height: `${tileSize - padding}px`,
        left: part.x * tileSize + padding / 2,
        top: part.y * tileSize + padding / 2,
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
