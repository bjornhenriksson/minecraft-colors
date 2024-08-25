import { BlockType } from "../types";
import { Block } from "./Block";
import styles from "./Blocks.module.css";

interface BlocksProps {
  blocks: BlockType[];
}

export function Blocks({ blocks }: BlocksProps) {
  return (
    <div className={styles.blocks}>
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  );
}
