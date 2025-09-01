// src/components/CosmicBg.tsx
import { memo, useMemo } from "react";

export default memo(function CosmicBg() {
  const stars = useMemo(
    () =>
      Array.from({ length: 120 }).map(() => ({
        cx: Math.random() * 100 + "%",
        cy: Math.random() * 100 + "%",
        r: Math.random() * 1.6 + 0.4,
      })),
    []
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        background:
          "radial-gradient(1200px 800px at 20% -10%, rgba(246,224,94,.18), transparent 60%), linear-gradient(180deg,#0b1020 0%, #0b1020 60%, #0e1530 100%)",
      }}
    >
      <svg width="100%" height="100%" style={{ opacity: 0.25 }}>
        {stars.map((s, i) => (
          <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#fff" />
        ))}
      </svg>
    </div>
  );
});