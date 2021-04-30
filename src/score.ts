const STORAGE_KEY = "highest-score";

export const getHighestScore = (): number => {
  const score = window.localStorage.getItem(STORAGE_KEY);

  return Number(score);
};

export const registerScore = (score: number) => {
  const currentHighestScore = getHighestScore();

  if (score > currentHighestScore) {
    window.localStorage.setItem(STORAGE_KEY, score.toString());
  }
};
