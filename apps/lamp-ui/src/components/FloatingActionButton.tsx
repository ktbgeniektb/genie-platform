import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingActionButtonProps {
  onClick: () => void;
}

export const FloatingActionButton = ({ onClick }: FloatingActionButtonProps) => {
  return (
    <Button
      variant="floating"
      size="fab"
      className="fixed bottom-8 right-8 z-50"
      onClick={onClick}
      aria-label="Add new reflection log"
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
};