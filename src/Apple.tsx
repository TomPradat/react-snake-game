import React from "react";

type Props = {
  tileSize: number;
  position: { x: number; y: number };
};

const Apple = ({ tileSize, position }: Props) => (
  <div
    style={{
      width: `${tileSize - 10}px`,
      height: `${tileSize - 10}px`,
      backgroundColor: "red",
      borderRadius: "50%",
      position: "absolute",
      left: position.x * tileSize + 5,
      top: position.y * tileSize + 5,
    }}
  />
);

export default Apple;
