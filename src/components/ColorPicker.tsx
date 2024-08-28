import { useCallback, useState } from "react";
import { rgbToHsl } from "../lib/utils";
import styles from "./ColorPicker.module.css";

interface ColorPickerProps {
  onPick: (hsl: number[]) => void;
}

export function ColorPicker({ onPick }: ColorPickerProps) {
  const [color, setColor] = useState("#00e1ff");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setColor(e.target.value);

      const [r, g, b] = e.target.value
        .slice(1)
        .match(/.{1,2}/g)!
        .map((hex) => parseInt(hex, 16));

      const hsl = rgbToHsl(r, g, b);
      onPick(hsl);
    },
    [onPick]
  );

  return (
    <input
      type="color"
      onChange={handleChange}
      className={styles.picker}
      value={color}
    />
  );
}
