/**
 * A little line drawing of me at a laptop: code floats up while I type,
 * steam rises from the mug, and every few seconds I take a sip.
 * Purely decorative; the animation stops for visitors who prefer reduced motion.
 */
export function Coder({ className }: { className?: string }) {
  const ink = "var(--fg)";
  return (
    <svg viewBox="0 34 200 98" className={`coder ${className ?? ""}`} role="img" aria-label="Illustration of Suraj coding on a laptop and sipping coffee">
      {/* floating code */}
      <g fontFamily="var(--font-sans)" fontSize="9" fontWeight="600" fill="var(--muted)">
        <text x="40" y="100" className="float-code">{"</>"}</text>
        <text x="58" y="88" className="float-code" style={{ animationDelay: "0.9s" }}>{"{ }"}</text>
        <text x="46" y="76" className="float-code" style={{ animationDelay: "1.8s" }} fill="var(--signal)">;</text>
      </g>

      {/* head, hair and glasses */}
      <g className="head">
        <circle cx="100" cy="70" r="15" fill="var(--bg)" stroke={ink} strokeWidth="1.6" />
        <g fill={ink}>
          <circle cx="88" cy="58" r="6" />
          <circle cx="95" cy="53.5" r="6.5" />
          <circle cx="104" cy="53" r="6.5" />
          <circle cx="112" cy="57.5" r="6" />
          <circle cx="85" cy="65" r="4.2" />
          <circle cx="115.5" cy="64.5" r="4.2" />
        </g>
        <rect x="89.5" y="66" width="8.5" height="6" rx="1.6" fill="none" stroke={ink} strokeWidth="1.3" />
        <rect x="102" y="66" width="8.5" height="6" rx="1.6" fill="none" stroke={ink} strokeWidth="1.3" />
        <line x1="98" y1="68" x2="102" y2="68" stroke={ink} strokeWidth="1.2" />
        <path d="M97 79.5q3 1.6 6 0" fill="none" stroke={ink} strokeWidth="1.3" strokeLinecap="round" />
      </g>

      {/* neck */}
      <path d="M96 84v11M104 84v11" stroke={ink} strokeWidth="1.6" strokeLinecap="round" />

      {/* body */}
      <path d="M62 124c0-19 12-29 38-29s38 10 38 29" fill="var(--bg)" stroke={ink} strokeWidth="1.6" />

      {/* laptop, seen from behind */}
      <rect x="66" y="96" width="60" height="28" rx="3" fill="var(--surface-2)" stroke={ink} strokeWidth="1.6" />
      <circle cx="96" cy="110" r="2.6" fill="var(--signal)" />
      <line x1="58" y1="124.5" x2="134" y2="124.5" stroke={ink} strokeWidth="2.4" strokeLinecap="round" />

      {/* desk */}
      <line x1="10" y1="126" x2="190" y2="126" stroke="var(--line)" strokeWidth="1.4" strokeLinecap="round" />

      {/* steam, only while the mug rests on the desk */}
      <g className="steam-wrap" fill="none" stroke="var(--muted)" strokeWidth="1.2" strokeLinecap="round">
        <path className="steam" d="M155 104q-2-3 0-6t0-6" />
        <path className="steam" d="M161 104q2-3 0-6t0-6" style={{ animationDelay: "1.1s" }} />
      </g>

      {/* arm holding the mug */}
      <g className="sip-upper">
        <line x1="132" y1="100" x2="140" y2="118" stroke={ink} strokeWidth="1.8" strokeLinecap="round" />
        <g className="sip-fore">
          <line x1="140" y1="118" x2="152" y2="116.5" stroke={ink} strokeWidth="1.8" strokeLinecap="round" />
          <g className="sip-mug">
            <path d="M164 111.5h2.5a3 3 0 0 1 0 6H164" fill="none" stroke={ink} strokeWidth="1.5" />
            <rect x="152" y="109" width="12" height="15" rx="2.2" fill="var(--bg)" stroke={ink} strokeWidth="1.6" />
            <line x1="152" y1="113" x2="164" y2="113" stroke="var(--signal)" strokeWidth="1.6" />
          </g>
        </g>
      </g>
    </svg>
  );
}
