import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogCard } from "@/components/LogCard";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { toast } from "sonner";

// Sample reflection logs
const sampleLogs = [
  {
    id: 1,
    title: "First Day Reflections",
    category: "Personal",
    preview: "Today was the beginning of my journey with Lamp. I'm excited to build a habit of regular self-reflection...",
    date: "2 days ago",
  },
  {
    id: 2,
    title: "Academic Goals for Spring",
    category: "Academic",
    preview: "Setting clear objectives for this semester: maintain GPA above 3.5, complete research project, and improve public speaking...",
    date: "5 days ago",
  },
  {
    id: 3,
    title: "What I Learned This Week",
    category: "Learning",
    preview: "Key insights from my classes and personal reading. The concept of growth mindset really resonated with me...",
    date: "1 week ago",
  },
  {
    id: 4,
    title: "Overcoming Procrastination",
    category: "Productivity",
    preview: "Identified patterns in my procrastination habits and created actionable strategies to address them...",
    date: "1 week ago",
  },
  {
    id: 5,
    title: "Gratitude Practice",
    category: "Wellness",
    preview: "Three things I'm grateful for today: supportive friends, learning opportunities, and good health...",
    date: "2 weeks ago",
  },
];

const LogList = () => {
  const navigate = useNavigate();
  const [logs] = useState(sampleLogs);

  const handleAddLog = () => {
    toast.success("New log creation coming soon!");
  };

  const handleLogClick = (logId: number) => {
    toast.info(`Opening log ${logId} - Full view coming soon!`);
  };

  return (
    <div className="page-transition min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/home")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Lightbulb className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">My Reflections</h1>
          </div>
          <p className="text-muted-foreground">
            {logs.length} reflection{logs.length !== 1 ? "s" : ""} logged
          </p>
        </header>

        {/* Log Cards */}
        <div className="space-y-4 pb-24">
          {logs.map((log) => (
            <LogCard
              key={log.id}
              title={log.title}
              category={log.category}
              preview={log.preview}
              date={log.date}
              onClick={() => handleLogClick(log.id)}
            />
          ))}
        </div>

        {/* Floating Action Button */}
        <FloatingActionButton onClick={handleAddLog} />
      </div>
    </div>
  );
};

export default LogList;
