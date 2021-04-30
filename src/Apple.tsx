import React from "react";

type Props = {
  tileSize: number;
  position: { x: number; y: number };
};

const Apple = ({ tileSize, position }: Props) => (
  <div
    className="bg-yellow-400 rounded-full absolute"
    style={{
      width: `${tileSize - 20}px`,
      height: `${tileSize - 20}px`,
      left: position.x * tileSize + 10,
      top: position.y * tileSize + 10,
    }}
  />
);

export default Apple;
