import { validWords } from "./valid-words";

export type WordleGame = {
  start: () => string;
  guess: (word: string) => Result;
  isGameOver: () => boolean;
  getPreviousGuesses: () => string[];
  maxGuesses: number;
};

type Result = {
  result: { letter: string; correctness: string }[];
  correct: boolean;
  valid: boolean;
  message: string;
};

export function createWordleGame(word: string): WordleGame {
  const guessedWords: string[] = [];
  const maxGuesses = 6;

  function start(): string {
    return "Welcome to Wordle! Try to guess the word in 6 tries.";
  }

  function guess(guess: string): Result {
    if (isGameOver()) {
      return {
        correct: false,
        result: [],
        valid: false,
        message: "Game is already over!",
      };
    }

    if (guessedWords.includes(guess)) {
      return {
        correct: false,
        result: [],
        valid: false,
        message: "You already guessed that word!",
      };
    }

    if (guess.length !== 5) {
      return {
        correct: false,
        result: [],
        valid: false,
        message: "Guess must be 5 letters long.",
      };
    }

    if (!validWords.includes(guess)) {
      return {
        correct: false,
        result: [],
        valid: false,
        message: "Invalid word.",
      };
    }

    guessedWords.push(guess);

    const result = analyzeGuess(word, guess);

    if (result.correct) {
      return result;
    }

    if (guessedWords.length === maxGuesses) {
      return {
        ...result,
        message: `Game over! The word was: ${word}`,
      };
    }

    return {
      ...result,
      message: `Wrong guess! ${maxGuesses - guessedWords.length} guesses left.`,
    };
  }

  function isGameOver(): boolean {
    return guessedWords.length === maxGuesses || guessedWords.includes(word);
  }

  function getPreviousGuesses(): string[] {
    return guessedWords;
  }

  return {
    start,
    guess,
    isGameOver,
    getPreviousGuesses,
    maxGuesses,
  };
}

function analyzeGuess(word: string, guess: string): Result {
  if (guess === word) {
    return {
      correct: true,
      result: word
        .split("")
        .map((letter) => ({ letter, correctness: "green" })),
      valid: true,
      message: `Congratulations! You guessed the word: ${word}`,
    };
  }

  const result: Result = {
    correct: false,
    result: [],
    valid: true,
    message: "",
  };

  for (let i = 0; i < guess.length; i++) {
    const letter = guess[i];
    if (!word.includes(letter)) {
      result.result.push({ letter, correctness: "red" });
      continue;
    }

    if (word[i] === letter) {
      result.result.push({ letter, correctness: "green" });
      word = word.replace(letter, " ");
      continue;
    }

    result.result.push({ letter, correctness: "yellow" });
    word = word.replace(letter, " ");
  }

  return result;
}
