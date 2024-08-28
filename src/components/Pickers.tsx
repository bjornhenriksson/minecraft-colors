import { BlockPicker } from "./BlockPicker";
import { ColorPicker } from "./ColorPicker";
import styles from "./Pickers.module.css";

interface PickersProps {
  onPick: (hsl: number[]) => void;
}

export function Pickers({ onPick }: PickersProps) {
  return (
    <div className={styles.pickers}>
      <label>
        Pick a color
        <ColorPicker onPick={onPick} />
      </label>

      <label>
        ...or pick a block
        <BlockPicker onPick={onPick} />
      </label>
    </div>
  );
}
