import { SimpleGrid } from "@mantine/core";
import GlowCard from "./GlowCard";

export default function StudentsKPI({ items }) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
      {items.map((it) => (
        <GlowCard key={it.label} {...it} />
      ))}
    </SimpleGrid>
  );
}