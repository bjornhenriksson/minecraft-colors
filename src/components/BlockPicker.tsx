import { Option, Select, SelectRootSlotProps } from "@mui/base";
import clsx from "clsx";
import { forwardRef, useState } from "react";
import { MdOutlineUnfoldMore } from "react-icons/md";
import blocks from "../assets/colors.json";
import styles from "./BlockPicker.module.css";

interface BlockPickerProps {
  onPick: (hsl: number[]) => void;
}

const Button = forwardRef<HTMLButtonElement, SelectRootSlotProps<{}, boolean>>(
  ({ children, ownerState: _, ...props }, ref) => {
    return (
      <button {...props} ref={ref}>
        {children} <MdOutlineUnfoldMore />
      </button>
    );
  }
);

export function BlockPicker({ onPick }: BlockPickerProps) {
  const [selected, setSelected] = useState("diamond_block");

  const onChange = (_: any, value: string | null) => {
    console.log(_);
    if (!value) return;
    setSelected(value);
    const block = blocks.find((b) => b.name === value)!;
    onPick(block.hsl);
  };

  return (
    <Select
      value={selected}
      onChange={onChange}
      className={styles.select}
      slots={{ root: Button }}
      slotProps={{
        listbox: { className: styles.listbox },
      }}
    >
      {blocks.map((block, index) => (
        <Option
          key={index}
          value={block.name}
          className={styles.option}
          slotProps={{
            root: ({ selected, highlighted }) => ({
              className: clsx({
                [styles.option]: true,
                [styles.selected]: selected,
                [styles.highlighted]: highlighted,
              }),
            }),
          }}
        >
          {block.name}
        </Option>
      ))}
    </Select>
  );
}
