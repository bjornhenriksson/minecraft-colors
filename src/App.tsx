import styles from "./App.module.css";
import blocks from "./assets/colors.json";

interface Block {
  name: string;
  image: string;
  rgba: number[];
}

const eucDistance = ([x0, y0, z0]: number[], [x1, y1, z1]: number[]) =>
  Math.hypot(x1 - x0, y1 - y0, z1 - z0);

function similarBlocks(block: Block) {
  const threshold = 40;
  return blocks.filter(
    (b) => eucDistance(block.rgba, b.rgba) < threshold
    // && b.name === b.texture.split("/")[1]
  );
}

function Block({ block }: { block: Block }) {
  return <img src={"blocks/" + block.image} className={styles.block} />;
}

function App() {
  const lookupBlock = blocks.find((b) => b.name === "lime_concrete")!;
  const similar = similarBlocks(lookupBlock);
  const rgbaStr = `rgba(${lookupBlock.rgba.join(", ")})`;

  return (
    <div>
      <Block block={lookupBlock} />
      <div
        className={styles.block}
        style={{
          backgroundColor: rgbaStr,
        }}
      >
        {rgbaStr}
      </div>
      <h2>Similar blocks ({similar.length}):</h2>
      <div className={styles.blocks}>
        {similar.map((block, index) => (
          <Block key={index} block={block} />
        ))}
      </div>
    </div>
  );
}

export default App;
