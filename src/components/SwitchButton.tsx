import styles from "./SwitchButton.module.css";
import clsx from "clsx";

interface SwitchButtonProps {
  checked: boolean;
  onChange: () => void;
  labels: {
    first: string;
    second: string;
  };
}

export const SwitchButton = ({
  checked,
  onChange,
  labels,
}: SwitchButtonProps) => {
  return (
    <span
      className={clsx(styles.switch, {
        [styles.checked]: checked,
      })}
    >
      <span className={styles.label}>{labels.first}</span>
      <span className={styles.label}>{labels.second}</span>

      <span className={styles.thumb} />
      <input type="checkbox" className={styles.input} onChange={onChange} />
    </span>
  );
};
