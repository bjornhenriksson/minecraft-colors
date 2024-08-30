import { useMemo, useState } from "react";
import styles from "./App.module.css";
import blocks from "./assets/colors.json";
import { Pickers } from "./components/Pickers";
import { searchByHSL } from "./lib/similarity";
import { Blocks } from "./components/Blocks";

function App() {
  const [hsl, setHSL] = useState([187, 100, 50]);
  const [h, s, l] = hsl;
  const similar = searchByHSL(hsl, blocks);

  const complementary = useMemo(() => getComp(h, s, l), [h, s, l]);
  const doubleComplementary = useMemo(() => getDoubleComp(h, s, l), [h, s, l]);
  const triadic = useMemo(() => getTriadic(h, s, l), [h, s, l]);

  return (
    <div className={styles.app}>
      <div className={styles.bar}>
        <h1>Minecraft Color Explorer</h1>
        <p className={styles.sub}>
          This app helps you build Minecraft palettes and find similar
          complementary blocks.
        </p>
        <Pickers onPick={setHSL} />
      </div>

      <div className={styles.main}>
        <Blocks blocks={similar} label="Similar" />
        <Blocks blocks={complementary} label="Complementary" />
        <Blocks blocks={triadic} label="Triadic Palette" />
        <Blocks
          blocks={doubleComplementary}
          label="Double Complementary Palette"
        />
      </div>
    </div>
  );
}

export default App;

function getComp(h: number, s: number, l: number) {
  return searchByHSL([(h + 180) % 360, s, l], blocks);
}

function getTriadic(h: number, s: number, l: number) {
  const limit = 4;
  return [
    ...searchByHSL([h % 360, s, l], blocks, { limit }),
    ...searchByHSL([(h + 120) % 360, s, l], blocks, { limit }),
    ...searchByHSL([(h + 240) % 360, s, l], blocks, { limit }),
  ].slice(0, 12);
}

function getDoubleComp(h: number, s: number, l: number) {
  const limit = 3;

  const root = searchByHSL([h, s, l], blocks, { limit });
  const deg60 = searchByHSL([(h + 60) % 360, s, l], blocks, { limit });
  const deg180 = searchByHSL([(h + 180) % 360, s, l], blocks, { limit });
  const deg240 = searchByHSL([(h + 240) % 360, s, l], blocks, { limit });

  return Array.from({ length: root.length }, (_, i) => [
    root[i],
    deg60[i],
    deg180[i],
    deg240[i],
  ]).flat();
}
