import React from "react";

type Props = {
  tileSize: number;
  parts: Array<{ x: number; y: number }>;
};

const Snake = ({ tileSize, parts }: Props) => {
  return (
    <>
      {parts.map((part, index) => (
        <div
          key={index}
          style={{
            width: `${tileSize - 10}px`,
            height: `${tileSize - 10}px`,
            backgroundColor: "black",
            borderRadius: "50%",
            position: "absolute",
            left: part.x * tileSize + 5,
            top: part.y * tileSize + 5,
            transition: "all 400ms ease",
          }}
        />
      ))}
    </>
  );
};

export default Snake;
