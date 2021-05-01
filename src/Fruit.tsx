import React from "react";
import { useSettings } from "./GameSettingsContext";

type Props = {
  position: { x: number; y: number };
};

const Fruit = ({ position }: Props) => {
  const {
    board: { tileSize },
    fruit: { color: fruitColor },
  } = useSettings();

  let padding = tileSize / 2;

  return (
    <div
      className="rounded-full absolute"
      style={{
        width: `${tileSize - padding}px`,
        height: `${tileSize - padding}px`,
        backgroundColor: fruitColor,
        left: position.x * tileSize + padding / 2,
        top: position.y * tileSize + padding / 2,
      }}
    />
  );
};

export default Fruit;
