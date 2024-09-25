import { useEffect, useState } from "react";

export default function useTabCompletion({
  input,
  availableCommands,
  directoryContents,
}: {
  input: string;
  availableCommands: string[];
  directoryContents: string[];
}) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  useEffect(() => {
    const command = input.split(" ");
    const isCommandComplete = command.length > 1;

    isCommandComplete
      ? setSuggestions(
          directoryContents.filter((item) => item.startsWith(command[1]))
        )
      : setSuggestions(
          availableCommands.filter((cmd) => cmd.startsWith(command[0]))
        );
    setSelectedIndex(-1);
    setSelectedSuggestion("");
  }, [input]);

  function handleTabKeyDown(event: KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      if (suggestions.length === 0) return;
      const nextIndex = (selectedIndex + 1) % suggestions.length;
      setSelectedIndex(nextIndex);
      setSelectedSuggestion(suggestions[nextIndex]);
    }
  }

  return { suggestions, selectedSuggestion, handleTabKeyDown };
}
