console.log("HELLO");
import { createCanvas, loadImage } from "canvas";
import * as fs from "node:fs/promises";
import path from "node:path";

async function getDominantColor(image: string) {
  const canvas = createCanvas(1, 1);
  const ctx = canvas.getContext("2d");
  const imgPath = `./public/blocks/${image}`;

  try {
    const image = await loadImage(imgPath);
    ctx.drawImage(image, 0, 0, 1, 1);
    const { data } = ctx.getImageData(0, 0, 1, 1);
    return Array.from(data);
  } catch (error) {
    console.error(error);
  }
}

async function run() {
  const colors = [];

  const blocksDir = await fs.readdir("./public/blocks/");
  const blocksImages = blocksDir.filter(
    (block) => path.extname(block) === ".png"
  );

  for (const image of blocksImages) {
    const name = image.split(".")[0];
    const rgba = await getDominantColor(image);

    if (rgba) {
      colors.push({ name, rgba, image });
    }
  }

  await fs.writeFile(
    "./src/assets/colors.json",
    JSON.stringify(colors, null, 2)
  );
}

run();
