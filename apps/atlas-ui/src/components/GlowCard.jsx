import { Paper, Text } from "@mantine/core";

export default function GlowCard({ label, value, hint }) {
  return (
    <Paper
      radius="lg"
      p="md"
      withBorder
      style={{
        borderColor: "rgba(255,255,255,.08)",
        background: "rgba(255,255,255,.06)",
        backdropFilter: "blur(8px)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,255,255,.04)",
      }}
    >
      <Text size="xs" c="dimmed">{label}</Text>
      <Text fz={32} fw={700}>{value}</Text>
      {hint && <Text size="sm" c="dimmed">{hint}</Text>}
            <div
        style={{
          height: 2,
          marginTop: 12,
          marginBottom: 8,
          background:
            "linear-gradient(90deg, transparent, #F6E05E, transparent)",
          opacity: 0.9,
        }}
      />
    </Paper>
  );
}