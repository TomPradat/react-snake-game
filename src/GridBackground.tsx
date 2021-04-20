import React, { useEffect, useRef } from "react";
import { SIDE_SIZE } from "./Game";

const GridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");

    if (context) {
      context.fillStyle = "#357a38";

      new Array(50).fill("").forEach((v, idx) => {
        const columnNumber = (idx * 2) % 10;
        const rowNumber = (idx * 2 - columnNumber) / 10;
        context.fillRect(
          (columnNumber + (rowNumber % 2 === 0 ? 0 : 1)) * (SIDE_SIZE / 10),
          rowNumber * (SIDE_SIZE / 10),
          SIDE_SIZE / 10,
          SIDE_SIZE / 10
        );
      });

      context.fillStyle = "#4caf50";

      new Array(50).fill("").forEach((v, idx) => {
        const columnNumber = (idx * 2) % 10;
        const rowNumber = (idx * 2 - columnNumber) / 10;
        context.fillRect(
          (columnNumber + (rowNumber % 2 === 0 ? 1 : 0)) * (SIDE_SIZE / 10),
          rowNumber * (SIDE_SIZE / 10),
          SIDE_SIZE / 10,
          SIDE_SIZE / 10
        );
      });
    }
  }, []);

  return (
    <canvas
      width={`${SIDE_SIZE}px`}
      height={`${SIDE_SIZE}px`}
      ref={canvasRef}
    />
  );
};

export default GridBackground;
