import { BlockType } from "../types";

export const eucDistance = ([x0, y0, z0]: number[], [x1, y1, z1]: number[]) =>
  Math.hypot(x1 - x0, y1 - y0, z1 - z0);

const defaultOptions = { threshold: 5, limit: 5 };

export const searchByHSL = (
  hsl: number[],
  blocks: BlockType[],
  options?: { threshold?: number; limit?: number }
): BlockType[] => {
  const { threshold, limit } = options
    ? { ...defaultOptions, ...options }
    : defaultOptions;

  const results = blocks
    .map((block) => ({
      ...block,
      distance: eucDistance(hsl, block.hsl),
    }))
    .filter((block) => block.distance! < threshold)
    .sort((a, b) => a.distance! - b.distance!);

  if (results.length < limit) {
    return searchByHSL(hsl, blocks, {
      limit,
      threshold: threshold + 5,
    });
  }

  return results;
};
