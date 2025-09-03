import { Paper, Text } from "@mantine/core";

export default function GlowCard({ label, value, hint }) {
  return (
    <Paper
      radius="lg"
      p="md"
      withBorder
      style={{
        borderColor: "rgba(96,165,250,.25)", // 青系の淡い枠
        background: "rgba(15,23,42,.7)",      // ネイビー寄りの半透明
        backdropFilter: "blur(12px)",
        boxShadow:
          "0 8px 24px rgba(0,0,0,.6), inset 0 0 0 1px rgba(255,255,255,.04)",
      }}
    >
      <Text size="xs" c="dimmed" style={{ color: "#93c5fd" }}>
        {label}
      </Text>
      <Text fz={32} fw={700} style={{ color: "#f1f5f9" }}>
        {value}
      </Text>
      {hint && (
        <Text size="sm" style={{ color: "#a78bfa" }}>
          {hint}
        </Text>
      )}
      <div
        style={{
          height: 2,
          marginTop: 12,
          marginBottom: 8,
          background:
            "linear-gradient(90deg, transparent, #3b82f6, #8b5cf6, transparent)", // 青→紫
          opacity: 0.9,
        }}
      />
    </Paper>
  );
}