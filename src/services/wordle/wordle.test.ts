import { createWordleGame, WordleGame } from "./wordle";

describe("Wordle Game", () => {
  let game: WordleGame;
  const testWord = "apple";

  beforeEach(() => {
    game = createWordleGame(testWord);
  });

  test("start should return welcome message", () => {
    expect(game.start()).toBe(
      `Welcome to Wordle! Try to guess the word in ${game.maxGuesses} tries.`
    );
  });

  test("guess should return correct result for correct guess", () => {
    const result = game.guess("apple");
    expect(result.correct).toBe(true);
    expect(result.valid).toBe(true);
    expect(result.message).toBe("Congratulations! You guessed the word: apple");
    expect(result.result).toEqual([
      { letter: "a", correctness: "green" },
      { letter: "p", correctness: "green" },
      { letter: "p", correctness: "green" },
      { letter: "l", correctness: "green" },
      { letter: "e", correctness: "green" },
    ]);
  });

  test("guess should return invalid result for duplicate guess", () => {
    game.guess("hello");
    const result = game.guess("hello");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("You already guessed that word!");
  });

  test("guess should return invalid result for wrong length guess", () => {
    const result = game.guess("ab");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("Guess must be 5 letters long.");
  });

  test("guess should return invalid result for non-dictionary word", () => {
    const result = game.guess("xxxxx");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("Invalid word.");
  });

  test("guess should return correct result for incorrect guess", () => {
    const result = game.guess("adieu");
    expect(result.correct).toBe(false);
    expect(result.valid).toBe(true);
    expect(result.message).toBe("Wrong guess! 5 guesses left.");
    expect(result.result).toEqual([
      { letter: "a", correctness: "green" },
      { letter: "d", correctness: "red" },
      { letter: "i", correctness: "red" },
      { letter: "e", correctness: "yellow" },
      { letter: "u", correctness: "red" },
    ]);
  });

  test("isGameOver should return false at start", () => {
    expect(game.isGameOver()).toBe(false);
  });

  test("isGameOver should return true after correct guess", () => {
    game.guess("apple");
    expect(game.isGameOver()).toBe(true);
  });

  test("isGameOver should return true after 6 incorrect guesses", () => {
    game.guess("wrong");
    game.guess("slate");
    game.guess("check");
    game.guess("valid");
    game.guess("world");
    game.guess("hello");
    expect(game.isGameOver()).toBe(true);
  });

  test("getPreviousGuesses should return all previous guesses", () => {
    game.guess("hello");
    game.guess("world");
    expect(game.getPreviousGuesses()).toEqual(["hello", "world"]);
  });

  test("game over message after 6 incorrect guesses", () => {
    game.guess("wrong");
    game.guess("slate");
    game.guess("check");
    game.guess("valid");
    game.guess("world");
    const result = game.guess("hello");
    expect(result.message).toBe("Game over! The word was: apple");
  });
});
