import styles from "./Pill.module.css";
import clsx from "clsx";

interface PillProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export const Pill = ({ label, checked, onChange }: PillProps) => {
  return (
    <label
      className={clsx(styles.pill, {
        [styles.checked]: checked,
      })}
    >
      <input
        type="checkbox"
        name="filter"
        checked={checked}
        onChange={() => onChange()}
      />
      {label}
    </label>
  );
};
