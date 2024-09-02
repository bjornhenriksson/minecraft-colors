import { useMemo, useState } from "react";
import styles from "./App.module.css";
import blocks from "./assets/colors.json";
import { Pickers } from "./components/Pickers";
import { searchByHSL, SearchOptions } from "./lib/similarity";
import { Blocks } from "./components/Blocks";
import { BlockType } from "./types";
import { Filters, FilterState } from "./components/Filters";

const makeExclude = (keywords: string[]) => (block: BlockType) =>
  !keywords.some((f) => block.name.includes(f));

const makeInclude = (keywords: string[]) => (block: BlockType) =>
  keywords.some((f) => block.name.includes(f));

function App() {
  const [hsl, setHSL] = useState([187, 100, 50]);
  const [filters, setFilters] = useState<FilterState>({
    keywords: [],
    isExclude: true,
  });

  const [h, s, l] = hsl;
  const options = useMemo(
    () => ({
      filter: filters.isExclude
        ? makeExclude(filters.keywords)
        : makeInclude(filters.keywords),
    }),
    [filters]
  );

  const similar = useMemo(
    () => getSimilar(h, s, l, options),
    [h, s, l, options]
  );
  const complementary = useMemo(
    () => getComp(h, s, l, options),
    [h, s, l, options]
  );
  const doubleComplementary = useMemo(
    () => getDoubleComp(h, s, l, options),
    [h, s, l, options]
  );
  const triadic = useMemo(
    () => getTriadic(h, s, l, options),
    [h, s, l, options]
  );

  return (
    <div className={styles.app}>
      <div className={styles.bar}>
        <h1>Minecraft Color Explorer</h1>
        <p className={styles.sub}>
          This app helps you build Minecraft palettes and find similar
          complementary blocks.
        </p>
        <Pickers onPick={setHSL} />
        <Filters onChange={setFilters} />
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

type GetFunc = (
  h: number,
  s: number,
  l: number,
  options?: SearchOptions
) => BlockType[];

const getSimilar: GetFunc = (h, s, l, options) => {
  return searchByHSL([h, s, l], blocks, options);
};

const getComp: GetFunc = (h, s, l, options) => {
  return searchByHSL([(h + 180) % 360, s, l], blocks, options);
};

const getTriadic: GetFunc = (h, s, l, options) => {
  const _options = { ...options, limit: 4 };
  return [
    ...searchByHSL([h % 360, s, l], blocks, _options),
    ...searchByHSL([(h + 120) % 360, s, l], blocks, _options),
    ...searchByHSL([(h + 240) % 360, s, l], blocks, _options),
  ].slice(0, 12);
};

const getDoubleComp: GetFunc = (h, s, l, options) => {
  const _options = { ...options, limit: 3 };

  const root = searchByHSL([h, s, l], blocks, _options);
  const deg60 = searchByHSL([(h + 60) % 360, s, l], blocks, _options);
  const deg180 = searchByHSL([(h + 180) % 360, s, l], blocks, _options);
  const deg240 = searchByHSL([(h + 240) % 360, s, l], blocks, _options);

  return Array.from({ length: root.length }, (_, i) => [
    root[i],
    deg60[i],
    deg180[i],
    deg240[i],
  ])
    .flat()
    .filter(Boolean) as BlockType[];
};
