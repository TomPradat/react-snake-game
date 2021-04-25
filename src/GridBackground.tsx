import React, { useEffect, useRef } from "react";
import { GAME_CONSTANTS } from "./constants";

const {
  size,
  numberOfRows,
  primaryColor,
  secondaryColor,
} = GAME_CONSTANTS.board;

const GridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawBackground = (context: CanvasRenderingContext2D) => {
    const numberOfTiles = Math.pow(numberOfRows, 2);
    const tileSize = size / numberOfRows;

    for (let i = 0; i < numberOfTiles; i++) {
      const columnNumber = i % numberOfRows;
      const rowNumber = (i - columnNumber) / numberOfRows;

      context.fillStyle =
        (rowNumber + columnNumber) % 2 === 0 ? primaryColor : secondaryColor;
      context.fillRect(
        columnNumber * tileSize,
        rowNumber * tileSize,
        tileSize,
        tileSize
      );
    }
  };

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");

    if (context) {
      drawBackground(context);
    }
  }, []);

  return <canvas width={`${size}px`} height={`${size}px`} ref={canvasRef} />;
};

export default GridBackground;
