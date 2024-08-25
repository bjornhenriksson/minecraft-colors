import { useState } from "react";
import blocks from "../assets/colors.json";
import { BlockType } from "../types";

interface SelectBlockProps {
  onSelect: (block: BlockType) => void;
}

export function SelectBlock({ onSelect }: SelectBlockProps) {
  const [selected, setSelected] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
    const block = blocks.find((b) => b.name === e.target.value)!;
    onSelect(block);
  };

  return (
    <select value={selected} onChange={onChange}>
      {blocks.map((block, index) => (
        <option key={index} value={block.name}>
          {block.name}
        </option>
      ))}
    </select>
  );
}
