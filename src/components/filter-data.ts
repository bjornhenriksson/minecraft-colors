export const filterData = [
  { key: "glass", label: "Glass" },
  { key: "leaves", label: "Leaves" },
  { key: "ice", label: "Ice" },
  { key: "snow", label: "Snow" },
  //   { key: "wool", label: "Wool" },
  { key: "coral", label: "Corals" },
  { key: "ore", label: "Ore" },
  { key: "top", label: "Top Side" },
  {
    key: "valuables",
    label: "Valuables",
    children: [
      { key: "diamond_block", label: "Diamond" },
      { key: "emerald_block", label: "Emerald" },
      { key: "gold_block", label: "Gold" },
      { key: "iron_block", label: "Iron" },
      { key: "lapis_block", label: "Lapis" },
      { key: "quartz_block", label: "Quartz" },
      { key: "redstone_block", label: "Redstone" },
      { key: "netherite_block", label: "Netherite" },
    ],
  },
  {
    key: "entities",
    label: "Entities",
    children: [
      { key: "spawner", label: "Spawner" },
      { key: "target", label: "Target" },
      { key: "note_block", label: "Note Block" },
    ],
  },
  {
    key: "lights",
    label: "Lights",
    children: [
      { key: "redstone_lamp", label: "Redstone Lamp" },
      { key: "glowstone", label: "Glowstone" },
      { key: "shroomlight", label: "Shroomlight" },
      { key: "froglight", label: "Froglight" },
    ],
  },
  {
    key: "plants",
    label: "Plants",
    children: [
      { key: "mushroom", label: "Mushroom" },
      { key: "wart", label: "Wart" },
    ],
  },
];
