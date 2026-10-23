/** The flag of Nepal: two stacked pennants, crimson with a blue border, with the moon and the sun. */
export function NepalFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="-4 -4 92 112" className={className} role="img" aria-label="Flag of Nepal">
      <path
        d="M0 0 L82 46 L28 46 L82 104 L0 104 Z"
        fill="#DC143C"
        stroke="#003893"
        strokeWidth="6"
        strokeLinejoin="miter"
      />
      {/* moon */}
      <path d="M8 26 a14 14 0 0 0 28 0 a14 11 0 0 1 -28 0 Z" fill="#fff" />
      <circle cx="22" cy="30" r="5" fill="#fff" />
      {/* sun */}
      <g fill="#fff" transform="translate(22 78)">
        <circle r="7.5" />
        {Array.from({ length: 12 }).map((_, i) => (
          <path key={i} d="M0 -13 L2.4 -7 L-2.4 -7 Z" transform={`rotate(${i * 30})`} />
        ))}
      </g>
    </svg>
  );
}
