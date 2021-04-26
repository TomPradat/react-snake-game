type Position = { x: number; y: number };

type Snake = Array<Position>;

enum Directions {
  Right = "Right",
  Top = "Top",
  Left = "Left",
  Bottom = "Bottom",
}

class GameOverError extends Error {}

export type GameState = {
  snake: Snake;
  apple: Position | null;
  direction: Directions;
  isGameOver: boolean;
};

const computeNextSnake = (
  { snake, apple, direction }: GameState,
  numberOfRows: number
): Snake => {
  const nextSnake = [...snake];

  const currentSnakeHeadPosition = nextSnake[nextSnake.length - 1];
  let nextSnakeHeadPosition: Position;

  switch (direction) {
    case Directions.Right: {
      nextSnakeHeadPosition = {
        x: currentSnakeHeadPosition.x + 1,
        y: currentSnakeHeadPosition.y,
      };
      break;
    }
    case Directions.Left: {
      nextSnakeHeadPosition = {
        x: currentSnakeHeadPosition.x - 1,
        y: currentSnakeHeadPosition.y,
      };
      break;
    }
    case Directions.Top: {
      nextSnakeHeadPosition = {
        x: currentSnakeHeadPosition.x,
        y: currentSnakeHeadPosition.y - 1,
      };
      break;
    }
    case Directions.Bottom: {
      nextSnakeHeadPosition = {
        x: currentSnakeHeadPosition.x,
        y: currentSnakeHeadPosition.y + 1,
      };
      break;
    }
  }

  if (
    nextSnakeHeadPosition.x >= numberOfRows ||
    nextSnakeHeadPosition.y >= numberOfRows ||
    nextSnakeHeadPosition.x < 0 ||
    nextSnakeHeadPosition.y < 0
  ) {
    throw new GameOverError();
  }

  if (
    snake.find(
      (snakePart) =>
        snakePart.x === nextSnakeHeadPosition.x &&
        snakePart.y === nextSnakeHeadPosition.y
    )
  ) {
    throw new GameOverError();
  }

  if (
    !apple ||
    apple.x !== nextSnakeHeadPosition.x ||
    apple.y !== nextSnakeHeadPosition.y
  ) {
  }

  const tail = nextSnake.shift();
  nextSnake.push(nextSnakeHeadPosition);

  if (
    apple &&
    apple.x === nextSnakeHeadPosition.x &&
    apple.y === nextSnakeHeadPosition.y
  ) {
    nextSnake.unshift(tail as Position);
  }

  return nextSnake;
};

const generateNumber = (min: number, max: number): number => {
  return Math.ceil(Math.random() * (max - min) + min);
};

const generateApple = (snake: Snake, numberOfRows: number): Position => {
  const numberOfTiles = Math.pow(numberOfRows, 2);

  const numbersToExclude = snake.map(({ x, y }) => y * numberOfRows + x);

  const candidates = new Array(numberOfTiles)
    .fill("")
    .map((v, idx) => idx)
    .filter((number) => !numbersToExclude.includes(number));

  const randomNumber = generateNumber(0, candidates.length - 1);

  const chosenNumber = candidates[randomNumber];

  return {
    x: chosenNumber % numberOfRows,
    y: (chosenNumber - (chosenNumber % numberOfRows)) / numberOfRows,
  };
};

export const computeNextDirection = (
  { snake, direction: currentDirection }: GameState,
  event: KeyboardEvent
): Directions => {
  const head = snake[snake.length - 1];
  const neck = snake[snake.length - 2];

  let forbiddenDirection;

  if (head.x === neck.x) {
    forbiddenDirection =
      head.y - neck.y > 0 ? Directions.Top : Directions.Bottom;
  } else {
    forbiddenDirection =
      head.x - neck.x > 0 ? Directions.Left : Directions.Right;
  }

  const keyDirectionMapping: Record<string, Directions> = {
    ArrowRight: Directions.Right,
    ArrowLeft: Directions.Left,
    ArrowDown: Directions.Bottom,
    ArrowUp: Directions.Top,
  };

  const nextDirection = keyDirectionMapping[event.key] ?? currentDirection;

  return nextDirection === forbiddenDirection
    ? currentDirection
    : nextDirection;
};

const tick = (state: GameState, numberOfRows: number): GameState => {
  try {
    const snake = computeNextSnake(state, numberOfRows);
    let apple: Position | null;

    if (snake.length > state.snake.length) {
      apple = null;
    } else if (state.apple === null) {
      apple = generateApple(snake, numberOfRows);
    } else {
      apple = state.apple;
    }

    return { snake, apple, direction: state.direction, isGameOver: false };
  } catch (error) {
    return { ...state, isGameOver: true };
  }
};

export default tick;
