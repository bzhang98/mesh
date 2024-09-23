// hangman.test.ts
import { createHangman } from "./hangman";

describe("Hangman Game", () => {
  let game: ReturnType<typeof createHangman>;

  beforeEach(() => {
    // Create a new game instance before each test
    game = createHangman(["javascript"]); // Using a fixed word for predictable tests
  });

  test("should start the game and provide word information", () => {
    const startMessage = game.start();
    expect(startMessage).toBe(
      "Welcome to Hangman! The word has 10 letters. You have 6 guesses."
    );
    expect(game.getWordProgress()).toBe("_ _ _ _ _ _ _ _ _ _");
    expect(game.getRemainingGuesses()).toBe(6);
  });

  test("should allow guessing a correct letter", () => {
    game.start();
    const guessMessage = game.guess("j");
    expect(guessMessage).toBe("Good guess! Word: j _ _ _ _ _ _ _ _ _");
    expect(game.getGuessedLetters()).toContain("j");
  });

  test("should reduce remaining guesses after a wrong guess", () => {
    game.start();
    const guessMessage = game.guess("z");
    expect(guessMessage).toBe("Wrong guess! 5 guesses left.");
    expect(game.getRemainingGuesses()).toBe(5);
    expect(game.getGuessedLetters()).toContain("z");
  });

  test("should not allow guessing the same letter twice", () => {
    game.start();
    game.guess("j");
    const repeatGuessMessage = game.guess("j");
    expect(repeatGuessMessage).toBe("You already guessed that letter!");
  });

  test("should return game over after too many wrong guesses", () => {
    game.start();
    game.guess("z");
    game.guess("x");
    game.guess("o");
    game.guess("q");
    game.guess("m");
    const gameOverMessage = game.guess("k"); // Final wrong guess
    expect(gameOverMessage).toBe("Game over! The word was: javascript");
    expect(game.isGameOver()).toBe(true);
  });

  test("should congratulate when the word is guessed correctly", () => {
    game.start();
    game.guess("j");
    game.guess("a");
    game.guess("v");
    game.guess("s");
    game.guess("c");
    game.guess("r");
    game.guess("i");
    game.guess("p");
    const winMessage = game.guess("t"); // Final correct guess
    expect(winMessage).toBe(
      "Congratulations! You guessed the word: javascript"
    );
    expect(game.getWordProgress()).toBe("j a v a s c r i p t");
    expect(game.isGameOver()).toBe(true);
  });

  test("should return correct word progress during the game", () => {
    game.start();
    game.guess("j");
    game.guess("a");
    expect(game.getWordProgress()).toBe("j a _ a _ _ _ _ _ _");
  });
});
