import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MenuCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export const MenuCard = ({ title, description, icon: Icon, onClick }: MenuCardProps) => {
  return (
    <Card 
      className="hover-lift cursor-pointer transition-all"
      onClick={onClick}
    >
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};
