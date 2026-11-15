/**
 * The drawing for <Buddy />: a cartoon mini-Brandon (deep brown skin, buzz cut,
 * round glasses, red hoodie, dark trousers, white sneakers). Every prop and
 * face is always in the SVG; CSS in globals.css shows the ones the current
 * pose needs (see the `.buddy[data-pose=...]` rules).
 */

const SKIN = "#5b3a24";
const INK = "rgb(var(--ink))";
const PAPER = "rgb(var(--paper))";
const HOODIE = "rgb(var(--accent))";

type P = [number, number];

/** A sleeve (ink outline + red hoodie) ending in a hand. */
const Arm = ({ from, to, className }: { from: P; to: P; className?: string }) => (
  <g className={className}>
    <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke={INK} strokeWidth="8" strokeLinecap="round" />
    <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke={HOODIE} strokeWidth="4.5" strokeLinecap="round" />
    <circle cx={to[0]} cy={to[1]} r="3.4" fill={SKIN} stroke={INK} strokeWidth="2" />
  </g>
);

/** A leg: trouser plus a white sneaker. */
const Leg = ({ x, className }: { x: number; className: string }) => (
  <g className={className}>
    <rect x={x} y="67" width="8" height="14" rx="3" fill={INK} stroke={PAPER} strokeWidth="1.2" />
    <path d={`M${x - 2} 85 q0 -5 5 -5 h5 q4 0 4 5 Z`} fill={PAPER} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
  </g>
);

export default function BuddyFigure() {
  return (
    <svg viewBox="0 0 80 92" className="block h-auto w-full overflow-visible" aria-hidden>
      {/* zzz (asleep) */}
      <g className="b-zzz font-mono" fontWeight="700" fill={INK} stroke={PAPER} strokeWidth="1.6" paintOrder="stroke">
        <text x="58" y="16" fontSize="13">z</text>
        <text x="65" y="7" fontSize="10">z</text>
        <text x="71" y="0" fontSize="8">z</text>
      </g>
      {/* music notes (dancing) */}
      <g className="b-notes" fill={HOODIE} stroke={PAPER} strokeWidth="1.6" paintOrder="stroke">
        <text x="2" y="20" fontSize="15">♪</text>
        <text x="64" y="12" fontSize="13">♫</text>
      </g>
      {/* light bulb (explaining) */}
      <g className="b-bulb">
        <circle cx="70" cy="10" r="7" fill="rgb(var(--highlight))" stroke={INK} strokeWidth="2.5" />
        <rect x="67" y="16" width="6" height="4" rx="1" fill={INK} />
        <path d="M70 -3 v-3 M80 2 l2.5 -2 M60 2 l-2.5 -2" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* camera flash (photography) */}
      <g className="b-flash">
        <circle cx="28" cy="20" r="15" fill={PAPER} opacity="0.9" />
        <path d="M28 9 L30 18 L39 20 L30 22 L28 31 L26 22 L17 20 L26 18 Z" fill="rgb(var(--highlight))" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      </g>

      <ellipse className="b-shadow" cx="40" cy="88" rx="18" ry="3" fill="rgb(var(--ink) / 0.25)" />

      <g className="b-figure">
        <Leg x={31} className="b-leg-l" />
        <Leg x={41} className="b-leg-r" />

        {/* arms: one set per pose */}
        <g className="arms arms-default">
          <Arm className="b-arm-l" from={[27, 51]} to={[17, 63]} />
          <Arm className="b-arm-r" from={[53, 51]} to={[63, 63]} />
        </g>
        <g className="arms arms-wave">
          <Arm from={[27, 51]} to={[18, 63]} />
          <Arm className="b-arm-wave" from={[53, 50]} to={[64, 33]} />
        </g>
        <g className="arms arms-explain">
          <Arm from={[27, 51]} to={[19, 62]} />
          <Arm className="b-arm-point" from={[53, 50]} to={[69, 40]} />
        </g>

        <g className="b-body">
          {/* hoodie with a hard offset shadow */}
          <rect x="26" y="47" width="32" height="24" rx="9" fill={INK} stroke={PAPER} strokeWidth="1.2" />
          <rect x="23.5" y="44.5" width="32" height="24" rx="9" fill={HOODIE} stroke={INK} strokeWidth="3" />
          <path d="M35 47 v6 M44 47 v6" stroke={PAPER} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M31 60 h17 v5 h-17 Z" fill="none" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" opacity="0.6" />

          {/* head */}
          <circle cx="25.5" cy="31" r="3.2" fill={SKIN} stroke={INK} strokeWidth="2" />
          <circle cx="54.5" cy="31" r="3.2" fill={SKIN} stroke={INK} strokeWidth="2" />
          <circle cx="40" cy="30" r="15" fill={SKIN} stroke={INK} strokeWidth="3" />
          {/* buzz cut */}
          <path className="b-hair" d="M25.6 26 C26.5 13 53.5 13 54.4 26 C49 20.5 31 20.5 25.6 26 Z" fill="#141414" />

          {/* nightcap (night) */}
          <g className="b-nightcap">
            <path d="M24 27 C24 10 52 8 59 17 C66 23 72 30 72 38 C67 31 61 27 56 27 Z" fill={INK} stroke={PAPER} strokeWidth="1.4" strokeLinejoin="round" />
            <rect x="23" y="23" width="34" height="6" rx="3" fill={PAPER} stroke={INK} strokeWidth="2.5" />
            <circle className="b-pom" cx="72" cy="39" r="4" fill="rgb(var(--highlight))" stroke={INK} strokeWidth="2.5" />
          </g>

          {/* round glasses: light lenses keep the eyes readable */}
          <g className="b-glasses">
            <circle cx="33.5" cy="32" r="5.6" fill={PAPER} fillOpacity="0.88" stroke={INK} strokeWidth="2.2" />
            <circle cx="46.5" cy="32" r="5.6" fill={PAPER} fillOpacity="0.88" stroke={INK} strokeWidth="2.2" />
            <path d="M39.1 31.5 h1.8 M27.9 31 l-2 -1 M52.1 31 l2 -1" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* faces */}
          <g className="face face-sleep" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round">
            <path d="M31 32.5 q2.5 2 5 0" />
            <path d="M44 32.5 q2.5 2 5 0" />
            <circle cx="40" cy="40.5" r="1.6" fill={INK} stroke="none" />
          </g>
          <g className="face face-happy">
            <path d="M31 33.5 q2.5 -3.5 5 0 M44 33.5 q2.5 -3.5 5 0" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
            <path d="M35.5 39 q4.5 5.5 9 0 Z" fill={PAPER} stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
          </g>
          <g className="face face-focus">
            <path d="M29 25.5 l7 1.8 M51 25.5 l-7 1.8" stroke="#141414" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="33.5" cy="32.5" r="1.9" fill={INK} />
            <circle cx="46.5" cy="32.5" r="1.9" fill={INK} />
            <path d="M37 41 h6" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          </g>
          <g className="face face-talk">
            <circle cx="33.5" cy="32" r="2" fill={INK} />
            <circle cx="46.5" cy="32" r="2" fill={INK} />
            <ellipse className="b-mouth" cx="40" cy="40.5" rx="3" ry="2.4" fill={INK} />
          </g>

          {/* sweat drops (working) */}
          <g className="b-sweat" fill="#5bc8e8" stroke={INK} strokeWidth="1.2">
            <path className="b-drop-1" d="M56 20 q3 5 0 7 q-3 -2 0 -7 Z" />
            <path className="b-drop-2" d="M24 22 q3 5 0 7 q-3 -2 0 -7 Z" />
          </g>
        </g>

        {/* laptop (working): we see the back of the lid */}
        <g className="prop prop-laptop">
          <rect x="17" y="51" width="46" height="19" rx="3" fill={INK} stroke={PAPER} strokeWidth="1.5" />
          <circle cx="40" cy="60.5" r="2.8" fill="rgb(var(--highlight))" />
          <rect x="12" y="69" width="56" height="5" rx="2" fill={INK} stroke={PAPER} strokeWidth="1.5" />
          <Arm className="b-type-l" from={[27, 52]} to={[31, 64]} />
          <Arm className="b-type-r" from={[53, 52]} to={[49, 64]} />
        </g>

        {/* camera (photography), held up to the face */}
        <g className="prop prop-camera">
          <Arm from={[27, 51]} to={[25, 38]} />
          <Arm from={[53, 51]} to={[56, 38]} />
          <rect x="25" y="20" width="9" height="5" rx="1.5" fill={INK} />
          <rect x="21" y="23" width="38" height="22" rx="5" fill={INK} stroke={PAPER} strokeWidth="1.5" />
          <circle cx="42" cy="34" r="7.5" fill={PAPER} stroke={INK} strokeWidth="2.5" />
          <circle cx="42" cy="34" r="3.8" fill={INK} />
          <circle cx="44" cy="32" r="1.2" fill={PAPER} />
          <circle cx="27" cy="28.5" r="1.7" fill={HOODIE} />
        </g>
      </g>
    </svg>
  );
}
