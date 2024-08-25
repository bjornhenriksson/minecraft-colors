export function Button({
  hsl,
  isActive,
  children,
  style = {},
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive?: boolean;
  hsl: number[];
}) {
  return (
    <button {...props} style={isActive ? activeStyles(style, hsl) : style}>
      {children}
    </button>
  );
}

function activeStyles(style: React.CSSProperties, hsl: number[]) {
  return {
    ...style,
    backgroundColor: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`,
    color: hsl[2] > 50 ? "black" : "white",
  };
}
