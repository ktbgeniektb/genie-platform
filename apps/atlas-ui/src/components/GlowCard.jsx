import { Paper, Text } from "@mantine/core";

export default function GlowCard({ label, value, hint }) {
  return (
    <Paper shadow="lg" radius="xl" p="xl"
      style={{ background: "rgba(255,255,255,.06)", backdropFilter: "blur(8px)" }}
    >
      <Text size="xs" c="dimmed">{label}</Text>
      <Text fz={32} fw={700}>{value}</Text>
      {hint && <Text size="sm" c="dimmed">{hint}</Text>}
    </Paper>
  );
}