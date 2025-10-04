import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LogCardProps {
  title: string;
  category: string;
  preview: string;
  date: string;
  onClick?: () => void;
}

export const LogCard = ({ title, category, preview, date, onClick }: LogCardProps) => {
  return (
    <Card 
      className="hover-lift cursor-pointer transition-all"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant="secondary" className="shrink-0">
            {category}
          </Badge>
        </div>
        <CardDescription className="text-xs">{date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">{preview}</p>
      </CardContent>
    </Card>
  );
};
