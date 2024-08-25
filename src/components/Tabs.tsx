import { useState } from "react";
import { rgbToHsl } from "../lib/utils";
import { Button } from "./Button";
import { SelectBlock } from "./SelectBlock";
import styles from "./Tabs.module.css";

interface TabsProps {
  hsl: number[];
  setHSL: (hsl: number[]) => void;
}

export function Tabs({ hsl, setHSL }: TabsProps) {
  const [selectedTab, setSelectedTab] = useState("color");

  return (
    <div className={styles.tabs}>
      <div className={styles.tabNav}>
        <label htmlFor="color" onClick={() => setSelectedTab("color")}>
          <Button
            hsl={hsl}
            isActive={selectedTab === "color"}
            style={{
              pointerEvents: "none",
            }}
          >
            Color
          </Button>
        </label>
        <Button
          hsl={hsl}
          isActive={selectedTab === "block"}
          onClick={() => setSelectedTab("block")}
        >
          Block
        </Button>
      </div>
      <div className={styles.tabContent}>
        <input
          placeholder="Block name"
          id="color"
          type="color"
          style={{
            visibility: "hidden",
          }}
          onChange={(e) => {
            const [r, g, b] = e.target.value
              .slice(1)
              .match(/.{1,2}/g)!
              .map((hex) => parseInt(hex, 16));

            const hsl = rgbToHsl(r, g, b);

            console.log({ hsl });
            setHSL(hsl);
          }}
        />
      </div>

      <SelectBlock
        onSelect={(block) => {
          setHSL(block.hsl);
        }}
      />
    </div>
  );
}
