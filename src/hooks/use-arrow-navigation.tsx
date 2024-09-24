import { useEffect, useState } from "react";

export default function useArrowNavigation<T>(items: T[]) {
  const [index, setIndex] = useState<number>(items.length);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  useEffect(() => {
    setIndex(items.length);
  }, [items]);

  useEffect(() => {
    setSelectedItem(items[index] || null);
  }, [index]);

  function handleArrowKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowUp") {
      setIndex(prevIndex => Math.max(0, prevIndex - 1));
    } else if (event.key === "ArrowDown") {
      setIndex(prevIndex => Math.min(items.length, prevIndex + 1));
    }
  }

  return {
    selectedItem: selectedItem || "",
    handleArrowKeyDown,
  };
}
