import { BlockType } from "../types";
import { Block } from "./Block";
import styles from "./Blocks.module.css";

interface BlocksProps {
  blocks: BlockType[];
  label: string;
  columns?: number;
  span?: string;
}

export function Blocks({
  blocks,
  label,
  columns = 4,
  span = "auto",
}: BlocksProps) {
  return (
    <div
      style={{
        gridColumn: span,
      }}
    >
      <h2>{label}</h2>
      <div
        className={styles.blocks}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {blocks.map((block, index) => (
          <Block key={index} block={block} />
        ))}
      </div>
    </div>
  );
}
