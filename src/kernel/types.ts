export type Position = { x: number; y: number };

export type Snake = Array<Position>;

export enum Directions {
  Right = "Right",
  Top = "Top",
  Left = "Left",
  Bottom = "Bottom",
}

export type GameState = {
  snake: Snake;
  fruit: Position | null;
  direction: Directions;
  isGameOver: boolean;
};
