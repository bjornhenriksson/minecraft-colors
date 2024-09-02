import { BlockType } from "../types";

export const eucDistance = ([x0, y0, z0]: number[], [x1, y1, z1]: number[]) =>
  Math.hypot(x1 - x0, y1 - y0, z1 - z0);

const defaultOptions = {
  threshold: 5,
  limit: 12,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  filter: (_block: BlockType) => true,
};

export type SearchOptions = Partial<typeof defaultOptions>;

export const searchByHSL = (
  hsl: number[],
  blocks: BlockType[],
  options?: SearchOptions
): BlockType[] => {
  const { threshold, limit, filter } = options
    ? { ...defaultOptions, ...options }
    : defaultOptions;

  const search = (distance = threshold) => {
    const res = blocks
      .map((block) => ({
        ...block,
        distance: eucDistance(hsl, block.hsl),
      }))
      .filter((block) => block.distance! < distance)
      .filter(filter)
      .sort((a, b) => a.distance! - b.distance!)
      .slice(0, limit);

    if (res.length < limit && distance < 100) {
      return search(distance + 5);
    }

    return res;
  };

  return search();
};
