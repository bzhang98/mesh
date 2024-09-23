import { useEffect, useRef } from "react";

export default function TerminalInput({ onSubmit }: { onSubmit: (command: string) => void }) {
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
      input.focus();

      const handleBlur = () => {
        input.focus();
      };

      input.addEventListener("blur", handleBlur);
      window.addEventListener("keydown", handleKeyDown as EventListener);

      return () => {
        input.removeEventListener("blur", handleBlur);
        window.removeEventListener("keydown", handleKeyDown as EventListener);
      };
    }
  }, []);

  return (
    <div className="input-wrapper flex gap-2">
      <input ref={inputRef} type="text" className="bg-black outline-none w-full" />
    </div>
  );
}
