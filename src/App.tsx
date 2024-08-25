import { useState } from "react";
import styles from "./App.module.css";
import blocks from "./assets/colors.json";
import { BlockGroup } from "./components/BlockGroup";
import { Tabs } from "./components/Tabs";
import { searchByHSL } from "./lib/similarity";

function App() {
  const [hsl, setHSL] = useState([187, 100, 50]);

  const [h, s, l] = hsl;
  const similar = searchByHSL(hsl, blocks, {
    limit: 3,
  });
  const complementary = searchByHSL([(h + 180) % 360, s, l], blocks);
  const firstTriadic = searchByHSL([(h + 120) % 360, s, l], blocks);
  const secondTriadic = searchByHSL([(h + 240) % 360, s, l], blocks);

  return (
    <div className={styles.app}>
      <div className={styles.sidebar}>
        <h1>Minecraft Color Explorer</h1>
        <p>
          This app helps you build Minecraft palettes and find similar
          complementary blocks.
        </p>
        <p>Choose your starting point:</p>
        <Tabs hsl={hsl} setHSL={setHSL} />
      </div>

      <div className={styles.main}>
        <BlockGroup blocks={similar} label="Similar" />
        <BlockGroup blocks={complementary} label="Complementary" />
        <BlockGroup blocks={firstTriadic} label="First triadic" />
        <BlockGroup blocks={secondTriadic} label="Second triadic" />
      </div>
    </div>
  );
}

export default App;
