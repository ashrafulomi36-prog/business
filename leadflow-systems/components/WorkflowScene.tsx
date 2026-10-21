"use client";

const sources = [
  { y: 50, label: "Website form" },
  { y: 130, label: "Inbox" },
  { y: 210, label: "Phone notes" },
];

export default function WorkflowScene() {
  return (
    <svg viewBox="0 0 420 260" role="img" aria-label="Inquiries from a form, an inbox and phone notes flowing into one lead list" className="scene">
      {sources.map((s, i) => (
        <g key={s.label}>
          <path id={`p${i}`} d={`M 90 ${s.y} C 190 ${s.y}, 200 130, 290 130`} className="scene-line" />
          <rect x="6" y={s.y - 16} width="84" height="32" rx="6" className="scene-node" />
          <text x="48" y={s.y + 4} textAnchor="middle" className="scene-text">{s.label}</text>
          {[0, 1].map((k) => (
            <circle key={k} r="5" className="scene-dot">
              <animateMotion dur="4s" begin={`${i * 0.9 + k * 2}s`} repeatCount="indefinite" path={`M 90 ${s.y} C 190 ${s.y}, 200 130, 290 130`} />
            </circle>
          ))}
        </g>
      ))}
      <rect x="290" y="62" width="124" height="136" rx="8" className="scene-list" />
      {[84, 112, 140, 168].map((y, i) => (
        <g key={y}>
          <circle cx="308" cy={y} r="4" className={i === 0 ? "scene-dot" : "scene-pip"} />
          <rect x="320" y={y - 4} width={i % 2 ? 70 : 84} height="8" rx="4" className="scene-bar" />
        </g>
      ))}
    </svg>
  );
}
