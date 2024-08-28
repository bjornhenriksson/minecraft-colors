import { useMemo, useState } from "react";
import styles from "./App.module.css";
import blocks from "./assets/colors.json";
import { Pickers } from "./components/Pickers";
import { searchByHSL } from "./lib/similarity";
import { Blocks } from "./components/Blocks";
import { BlockType } from "./types";

function App() {
  const [hsl, setHSL] = useState([187, 100, 50]);
  const [h, s, l] = hsl;
  const similar = searchByHSL(hsl, blocks, {
    limit: 3,
  });

  const complementary = useMemo(() => getComp(h, s, l), [h, s, l]);
  const doubleComplementary = useMemo(() => getDoubleComp(h, s, l), [h, s, l]);
  const triadic = useMemo(() => getTriadic(h, s, l), [h, s, l]);

  return (
    <div className={styles.app}>
      <div className={styles.sidebar}>
        <h1>Minecraft Color Explorer</h1>
        <p>
          This app helps you build Minecraft palettes and find similar
          complementary blocks.
        </p>
        <Pickers onPick={setHSL} />
      </div>

      <div className={styles.main}>
        <Blocks blocks={similar} label="Similar" />
        <Blocks blocks={complementary} label="Complementary" />
        <Blocks
          blocks={triadic}
          label="Triadic Palette"
          columns={6}
          span="1 / 3"
        />
        <Blocks
          blocks={doubleComplementary}
          label="Double Complementary Palette"
          columns={4}
          span="1 / 3"
        />
      </div>
    </div>
  );
}

export default App;

function getComp(h: number, s: number, l: number) {
  return searchByHSL([(h + 180) % 360, s, l], blocks);
}

function palette(blocks: BlockType[]) {
  return blocks
    .map((block) => ({
      ...block,
      sort: Math.random(),
    }))
    .sort((a, b) => a.sort - b.sort);
}

function getTriadic(h: number, s: number, l: number) {
  return palette(
    [
      ...searchByHSL([h % 360, s, l], blocks, {
        limit: 3,
      }),
      ...searchByHSL([(h + 120) % 360, s, l], blocks, {
        limit: 3,
      }),
      ...searchByHSL([(h + 240) % 360, s, l], blocks, {
        limit: 3,
      }),
    ].slice(0, 6)
  );
}

function getDoubleComp(h: number, s: number, l: number) {
  return palette([
    ...searchByHSL([h, s, l], blocks, {
      limit: 2,
    }).slice(0, 2),
    ...searchByHSL([(h + 60) % 360, s, l], blocks, {
      limit: 2,
    }).slice(0, 2),
    ...searchByHSL([(h + 180) % 360, s, l], blocks, {
      limit: 2,
    }).slice(0, 2),
    ...searchByHSL([(h + 240) % 360, s, l], blocks, {
      limit: 2,
    }).slice(0, 2),
  ]);
}
