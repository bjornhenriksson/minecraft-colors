import { BlockType } from "../types";
import { Blocks } from "./Blocks";
import styles from "./BlockGroup.module.css";

interface BlockGroupProps {
  blocks: BlockType[];
  label: string;
}

export function BlockGroup({ blocks, label }: BlockGroupProps) {
  return (
    <div className={styles.group}>
      <h2>{label}</h2>
      <Blocks blocks={blocks} />
    </div>
  );
}
