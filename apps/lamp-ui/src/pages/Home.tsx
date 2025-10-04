import { useNavigate } from "react-router-dom";
import { MenuCard } from "@/components/MenuCard";
import { BookOpen, Target, TrendingUp, Settings, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

const Home = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "My Reflections",
      description: "View and manage your reflection logs",
      icon: BookOpen,
      action: () => navigate("/logs"),
    },
    {
      title: "Vision Board",
      description: "Visualize your goals and aspirations",
      icon: Target,
      action: () => console.log("Vision Board coming soon"),
    },
    {
      title: "Progress",
      description: "Track your personal growth journey",
      icon: TrendingUp,
      action: () => console.log("Progress coming soon"),
    },
    {
      title: "Settings",
      description: "Customize your Lamp experience",
      icon: Settings,
      action: () => console.log("Settings coming soon"),
    },
  ];

  return (
    <div className="page-transition min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Lightbulb className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Lamp</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Welcome back! Ready to reflect and grow?
          </p>
          <Button 
            variant="ghost" 
            className="mt-4"
            onClick={() => navigate("/")}
          >
            Sign Out
          </Button>
        </header>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item) => (
            <MenuCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={item.icon}
              onClick={item.action}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
