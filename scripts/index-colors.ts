import { createCanvas, loadImage } from "canvas";
import * as fs from "node:fs/promises";
import models from "./blocks_models.json";

/**
 * Lazy method of getting dominant color via rendering
 * image as 1x1 pixel and letting canvas decide
 * what the dominant color is. */
async function lazyDominantColorHSL(image: string) {
  const imgPath = `./public/blocks/${image}`;

  try {
    const image = await loadImage(imgPath);

    if (image.width !== image.height) {
      throw new Error(`Image ${image} is not square`);
    }

    const canvas = createCanvas(1, 1);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, 1, 1);
    const { data } = ctx.getImageData(0, 0, 1, 1);
    return rgbToHsl(data[0], data[1], data[2]);
  } catch (error) {
    console.error(error);
  }
}

async function run() {
  const colors = [];
  const _models = Object.entries(models)
    .map(([key, value]) => ({
      name: key,
      ...value,
    }))
    .filter(
      (model) =>
        model.hasOwnProperty("parent") && model.hasOwnProperty("textures")
    ) as {
    name: string;
    parent: string;
    textures: Record<string, string>;
  }[];

  const blocks = _models.filter((model) =>
    [
      "minecraft:block/cube_all",
      "minecraft:block/cube_column",
      "minecraft:block/cube_column_horizontal",
      "minecraft:block/leaves",
    ].includes(model.parent)
  );

  for (const block of blocks) {
    for (const uri of Object.values(block.textures)) {
      const name = uri.split("/")[1];
      const image = `${name}.png`;
      const hsl = await lazyDominantColorHSL(image);
      const isNameExist = colors.find((color) => color.name === name);

      if (hsl && !isNameExist) {
        colors.push({ name, hsl, image });
      }
    }
  }

  await fs.writeFile(
    "./src/assets/colors.json",
    JSON.stringify(colors, null, 2)
  );
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;

  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
}

run();
