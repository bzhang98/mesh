import { useEffect, useRef } from "react";

export default function TerminalInput({
  onSubmit,
}: {
  onSubmit: (command: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      const input = inputRef.current;
      if (input) {
        onSubmit(input.value);
        input.value = "";
      }
    }
  }

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      window.addEventListener("keydown", handleKeyDown as EventListener);

      return () => {
        window.removeEventListener("keydown", handleKeyDown as EventListener);
      };
    }
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      className="bg-black outline-none w-full"
    />
  );
}
