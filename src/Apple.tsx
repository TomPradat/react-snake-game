import React from "react";

type Props = {
  tileSize: number;
  position: { x: number; y: number };
};

const Apple = ({ tileSize, position }: Props) => (
  <div
    style={{
      width: `${tileSize - 20}px`,
      height: `${tileSize - 20}px`,
      backgroundColor: "red",
      borderRadius: "50%",
      position: "absolute",
      left: position.x * tileSize + 10,
      top: position.y * tileSize + 10,
    }}
  />
);

export default Apple;
