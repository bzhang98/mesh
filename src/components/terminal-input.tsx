import { useEffect, useRef } from "react";
import useArrowNavigation from "../hooks/use-arrow-navigation";

export default function TerminalInput({
  onSubmit,
  history,
}: {
  onSubmit: (command: string) => void;
  history: string[];
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { selectedItem, handleArrowKeyDown } = useArrowNavigation(history);

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      const input = inputRef.current;
      if (input) {
        onSubmit(input.value);
        input.value = "";
      }
    } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      handleArrowKeyDown(event);
    }
  }

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.value = selectedItem;
    }
  }, [selectedItem]);

  function handleClick() {
    const input = inputRef.current;
    if (input) {
      input.focus();
    }
  }

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      window.addEventListener("keydown", handleKeyDown as EventListener);
      document.addEventListener("click", handleClick);
      return () => {
        window.removeEventListener("keydown", handleKeyDown as EventListener);
        document.addEventListener("click", handleClick);
      };
    }
  }, [history]);

  return (
    <input
      ref={inputRef}
      type="text"
      className="bg-black outline-none w-full"
    />
  );
}
