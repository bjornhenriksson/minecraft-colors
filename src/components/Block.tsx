import { BlockType } from "../types";
import styles from "./Block.module.css";

interface BlockProps {
  block: BlockType;
}

export function Block({ block }: BlockProps) {
  return (
    <div className={styles.block}>
      <img src={"blocks/" + block.image} />
      <span>{block.name}</span>
    </div>
  );
}
