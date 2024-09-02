import { useCallback, useEffect, useState } from "react";
import styles from "./Filters.module.css";
import { SwitchButton } from "./SwitchButton";
import { Pill } from "./Pill";
import { filterData } from "./filter-data";

type FilterBaseType = {
  key: string;
  label: string;
};

export type FilterState = {
  keywords: string[];
  isExclude: boolean;
};

interface FiltersProps {
  onChange: (state: FilterState) => void;
}

const isChecked = (
  keywords: string[],
  key: string,
  children?: FilterBaseType[]
) =>
  children
    ? children.every((c) => keywords.includes(c.key))
    : keywords.includes(key);

export const Filters = ({ onChange }: FiltersProps) => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isExclude, setIsExclude] = useState(true);

  useEffect(() => {
    onChange({ keywords, isExclude });
  }, [keywords, isExclude, onChange]);

  const handleKeywordChange = useCallback((key: string) => {
    setKeywords((prev) => {
      const checked = isChecked(prev, key);
      const next = checked ? prev.filter((k) => k !== key) : [...prev, key];
      return next;
    });
  }, []);

  const handleKeywordChangeChildren = useCallback(
    (key: string, children: FilterBaseType[]) => {
      setKeywords((prev) => {
        const checked = isChecked(prev, key, children);
        const subKeys = children.map((child) => child.key);

        const updated = checked
          ? prev.filter((k) => !subKeys.includes(k))
          : [...prev, ...subKeys];

        return updated;
      });
    },
    []
  );

  const handleAll = useCallback(() => {
    filterData.forEach(({ key, children }) => {
      if (children) {
        handleKeywordChangeChildren(key, children);
      } else {
        handleKeywordChange(key);
      }
    });
  }, [handleKeywordChange, handleKeywordChangeChildren]);

  return (
    <fieldset className={styles.filterSet}>
      <legend>Filter</legend>
      <SwitchButton
        labels={{ first: "Include", second: "Exclude" }}
        checked={isExclude}
        onChange={() => {
          const updated = !isExclude;
          setIsExclude(updated);
          onChange({ keywords, isExclude: updated });
        }}
      />
      <div className={styles.filters}>
        <Pill
          label={keywords.length ? "Clear" : "All"}
          checked={false}
          onChange={() => {
            if (keywords.length) {
              setKeywords([]);
            } else {
              handleAll();
            }
          }}
        />

        {filterData.map(({ key, label, children }) => {
          const checked = isChecked(keywords, key, children);

          return (
            <Pill
              key={key}
              label={label}
              checked={checked}
              onChange={() => {
                if (children) {
                  handleKeywordChangeChildren(key, children);
                } else {
                  handleKeywordChange(key);
                }
              }}
            />
          );
        })}
      </div>
    </fieldset>
  );
};
