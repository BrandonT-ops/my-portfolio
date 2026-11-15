/**
 * Draws a project's system blueprint: boxes in columns, wired left to right,
 * with dashes flowing along the wires (CSS animation, off with reduced motion).
 * Pure SVG, rendered on the server.
 */
export default function Schematic({
  layers,
  width = 640,
  height = 480,
  fontSize = 13,
  className = "",
  label,
  gapRatio = 0.07,
}: {
  layers: string[][];
  width?: number;
  height?: number;
  fontSize?: number;
  className?: string;
  /** Horizontal space between columns, as a share of the width. */
  gapRatio?: number;
  /** Accessible description; omit when the diagram is decorative. */
  label?: string;
}) {
  const n = layers.length;
  const padX = width * 0.045;
  const top = height * 0.2;
  const bottom = height * 0.1;
  const gap = Math.min(width * gapRatio, 70);
  const bw = Math.min((width - 2 * padX - (n - 1) * gap) / n, width * 0.3);
  const total = n * bw + (n - 1) * gap;
  const x0 = (width - total) / 2;
  const charW = fontSize * 0.61;
  const maxText = bw - fontSize * 1.1;
  const maxChars = Math.max(4, Math.floor(maxText / charW));

  /** Break a label over two lines at a space when it is too wide for its box. */
  const wrap = (text: string): string[] => {
    if (text.length <= maxChars) return [text];
    const words = text.split(" ");
    if (words.length < 2) return [text];
    let best = [text];
    let bestLen = Infinity;
    for (let k = 1; k < words.length; k++) {
      const a = words.slice(0, k).join(" ");
      const b = words.slice(k).join(" ");
      const len = Math.max(a.length, b.length);
      if (len < bestLen) {
        bestLen = len;
        best = [a, b];
      }
    }
    return best;
  };
  const twoLines = layers.flat().some((t) => wrap(t).length > 1);
  const bh = fontSize * (twoLines ? 3.7 : 2.9);

  const nodes = layers.map((layer, i) => {
    const usable = height - top - bottom;
    const step = Math.min(usable / layer.length, bh * 1.7);
    const startY = top + (usable - step * layer.length) / 2 + (step - bh) / 2;
    return layer.map((text, j) => ({ text, lines: wrap(text), x: x0 + i * (bw + gap), y: startY + j * step }));
  });

  const edges: { d: string; key: string; delay: number }[] = [];
  for (let i = 0; i < n - 1; i++) {
    nodes[i].forEach((a, ai) =>
      nodes[i + 1].forEach((b, bi) => {
        const x1 = a.x + bw;
        const y1 = a.y + bh / 2;
        const x2 = b.x;
        const y2 = b.y + bh / 2;
        const mx = (x1 + x2) / 2;
        edges.push({
          d: `M${x1} ${y1} C${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`,
          key: `${i}-${ai}-${bi}`,
          delay: (i * 0.35 + (ai + bi) * 0.15) % 1.4,
        });
      }),
    );
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`schematic block h-full w-full ${className}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* layer rulers */}
      {nodes.map((col, i) => (
        <g key={`ruler-${i}`}>
          <line
            x1={col[0].x + bw / 2}
            x2={col[0].x + bw / 2}
            y1={top * 0.72}
            y2={height - bottom * 0.6}
            stroke="rgb(var(--line) / 0.08)"
            strokeDasharray="2 6"
          />
          <text
            x={col[0].x + bw / 2}
            y={top * 0.55}
            textAnchor="middle"
            fontSize={fontSize * 0.78}
            className="font-mono"
            fill="rgb(var(--line) / 0.4)"
            letterSpacing="0.14em"
          >
            L{i + 1}
          </text>
        </g>
      ))}

      {/* wires */}
      {edges.map((e) => (
        <g key={e.key} fill="none">
          <path d={e.d} stroke="rgb(var(--line) / 0.2)" strokeWidth="1.2" />
          <path
            d={e.d}
            className="schematic-flow"
            stroke="rgb(var(--signal))"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="5 26"
            style={{ animationDelay: `-${e.delay}s` }}
          />
        </g>
      ))}

      {/* boxes */}
      {nodes.flat().map((nd, k) => {
        const lh = fontSize * 1.2;
        const firstY = nd.y + bh / 2 + fontSize * 0.35 - ((nd.lines.length - 1) * lh) / 2;
        return (
          <g key={`${nd.text}-${k}`}>
            <rect x={nd.x + 4} y={nd.y + 4} width={bw} height={bh} fill="rgb(var(--accent) / 0.85)" />
            <rect x={nd.x} y={nd.y} width={bw} height={bh} fill="rgb(var(--sheet))" stroke="rgb(var(--line) / 0.8)" strokeWidth="1.5" />
            <circle cx={nd.x} cy={nd.y + bh / 2} r="3" fill="rgb(var(--line))" />
            <circle cx={nd.x + bw} cy={nd.y + bh / 2} r="3" fill="rgb(var(--line))" />
            {nd.lines.map((line, li) => {
              const est = line.length * charW;
              return (
                <text
                  key={li}
                  x={nd.x + bw / 2}
                  y={firstY + li * lh}
                  textAnchor="middle"
                  fontSize={fontSize}
                  className="font-mono"
                  fill="rgb(var(--line))"
                  textLength={est > maxText ? maxText : undefined}
                  lengthAdjust={est > maxText ? "spacingAndGlyphs" : undefined}
                >
                  {line}
                </text>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
