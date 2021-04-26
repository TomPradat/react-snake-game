import React from "react";

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
            style={{
              width: `${tileSize - reduction}px`,
              height: `${tileSize - reduction}px`,
              backgroundColor: "black",
              borderRadius: "50%",
              position: "absolute",
              left: part.x * tileSize + reduction / 2,
              top: part.y * tileSize + reduction / 2,
              transition: "all 400ms linear",
            }}
          />
        );
      })}
    </>
  );
};

export default Snake;
