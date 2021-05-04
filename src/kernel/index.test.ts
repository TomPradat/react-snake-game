import { tick, computeNextDirection } from "./index";
import { Directions, GameState } from "./types";

const snakeGoingRight = [
  { x: 0, y: 1 },
  { x: 1, y: 1 },
];

const snakeGoingLeft = [
  { x: 1, y: 1 },
  { x: 0, y: 1 },
];

const snakeGoingTop = [
  { x: 1, y: 3 },
  { x: 1, y: 2 },
];

const snakeGoingBottom = [
  { x: 1, y: 2 },
  { x: 1, y: 3 },
];

describe("compute next direction", () => {
  it("must keep the current direction if the chosen direction is the opposite direction", () => {
    expect(
      computeNextDirection(
        {
          snake: snakeGoingRight,
          direction: Directions.Right,
        },
        Directions.Left
      )
    ).toBe(Directions.Right);

    expect(
      computeNextDirection(
        {
          snake: snakeGoingLeft,
          direction: Directions.Left,
        },
        Directions.Right
      )
    ).toBe(Directions.Left);

    expect(
      computeNextDirection(
        {
          snake: snakeGoingTop,
          direction: Directions.Left,
        },
        Directions.Bottom
      )
    ).toBe(Directions.Left);

    expect(
      computeNextDirection(
        {
          snake: snakeGoingBottom,
          direction: Directions.Right,
        },
        Directions.Top
      )
    ).toBe(Directions.Right);
  });
});

describe("tick the game", () => {
  it("must be able to compute the next state", () => {
    const initialState: GameState = {
      snake: [
        { x: 0, y: 3 },
        { x: 1, y: 3 },
      ],
      fruit: { x: 3, y: 3 },
      direction: Directions.Right,
      isGameOver: false,
    };

    expect(tick(tick(initialState, 10, 10), 10, 10)).toMatchInlineSnapshot(`
      Object {
        "direction": "Right",
        "fruit": null,
        "isGameOver": false,
        "snake": Array [
          Object {
            "x": 1,
            "y": 3,
          },
          Object {
            "x": 2,
            "y": 3,
          },
          Object {
            "x": 3,
            "y": 3,
          },
        ],
      }
    `);
  });

  it("must result in game over if we hit a wall", () => {
    expect(
      tick(
        {
          snake: [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
          ],
          fruit: { x: 3, y: 3 },
          direction: Directions.Left,
          isGameOver: false,
        },
        10,
        10
      ).isGameOver
    ).toBe(true);
  });
});
