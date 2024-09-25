import { useCallback, useEffect, useRef, useState } from "react";
import useArrowNavigation from "../hooks/use-arrow-navigation";
import useTabCompletion from "../hooks/use-tab-completion";
import { Terminal } from "../services/terminal/types";

export default function TerminalInput({
  onSubmit,
  history,
  terminal,
}: {
  onSubmit: (command: string) => void;
  history: string[];
  terminal: Terminal;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  const { selectedItem, handleArrowKeyDown } = useArrowNavigation(history);

  const { suggestions, selectedSuggestion, handleTabKeyDown } =
    useTabCompletion({
      input: inputValue,
      availableCommands: terminal
        .executeCommandNoHistory("help")
        .split("\n")
        .slice(1),
      directoryContents: terminal.executeCommandNoHistory("ls").split(" "),
    });

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        const input = inputRef.current;
        onSubmit(input!.value);
        input!.value = "";
        setInputValue("");
      } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
        handleArrowKeyDown(event);
      } else if (event.key === "Tab") {
        handleTabKeyDown(event);
      }
    },
    [history, suggestions, selectedSuggestion]
  );

  useEffect(() => {
    inputRef.current!.value = selectedItem;
    setInputValue(selectedItem);
  }, [selectedItem]);

  function handleClick() {
    inputRef.current!.focus();
  }

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    window.addEventListener("keydown", handleKeyDown as EventListener);
    document.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("keydown", handleKeyDown as EventListener);
      document.addEventListener("click", handleClick);
    };
  }, [history, suggestions, selectedSuggestion]);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const inputParts = input.value.split(" ");
    const isTypingCommand = inputParts.length === 1; // Only 1 part means the user is typing a command

    if (selectedSuggestion) {
      if (isTypingCommand) {
        // Replace the command part
        input.value = selectedSuggestion;
      } else {
        // Append the argument part, keeping the command intact
        const command = inputParts[0]; // The first part is the command
        input.value = `${command} ${selectedSuggestion}`;
      }
    }
  }, [selectedSuggestion]);

  return (
    <>
      <div className="flex">
        <div className="prompt flex">
          {terminal.getPath()} <span>&nbsp;$&nbsp;</span>
        </div>
        <input
          ref={inputRef}
          onChange={(event) => setInputValue(event.target.value)}
          type="text"
          className="bg-black outline-none w-full"
        />
      </div>
    </>
  );
}
