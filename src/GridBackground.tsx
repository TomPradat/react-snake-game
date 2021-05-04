import React, { useCallback, useEffect, useRef } from "react";
import { useSettings } from "./GameSettingsContext";

const GridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const {
    board: {
      tileSize,
      numberOfRows,
      numberOfColumns,
      primaryColor,
      secondaryColor,
    },
  } = useSettings();

  const drawGrid = useCallback(
    (context: CanvasRenderingContext2D) => {
      const numberOfTiles = numberOfColumns * numberOfRows;

      for (let i = 0; i < numberOfTiles; i++) {
        const columnNumber = i % numberOfColumns;
        const rowNumber = (i - columnNumber) / numberOfColumns;

        context.fillStyle =
          (rowNumber + columnNumber) % 2 === 0 ? primaryColor : secondaryColor;
        context.fillRect(
          columnNumber * tileSize,
          rowNumber * tileSize,
          tileSize,
          tileSize
        );
      }
    },
    [numberOfRows, numberOfColumns, primaryColor, secondaryColor, tileSize]
  );

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");

    if (context) {
      drawGrid(context);
    }
  }, [drawGrid]);

  return (
    <canvas
      width={`${tileSize * numberOfColumns}px`}
      height={`${tileSize * numberOfRows}px`}
      ref={canvasRef}
    />
  );
};

export default GridBackground;
