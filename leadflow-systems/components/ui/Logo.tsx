export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="#0c1424" stroke="rgba(148,170,210,0.25)" />
      <g stroke="#38bdf8" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M8 9v14h10" />
        <path d="M14 14l9-5M14 14l9 9" />
      </g>
      <circle cx="23" cy="9" r="2.4" fill="#38bdf8" />
      <circle cx="23" cy="23" r="2.4" fill="#38bdf8" />
    </svg>
  );
}
