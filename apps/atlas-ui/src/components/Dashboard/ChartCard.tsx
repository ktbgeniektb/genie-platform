import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ChartCardProps {
  title: string;
  description: string;
  type: "line" | "bar";
}

const lineData = [
  { month: "Jan", students: 400 },
  { month: "Feb", students: 500 },
  { month: "Mar", students: 470 },
  { month: "Apr", students: 600 },
  { month: "May", students: 680 },
  { month: "Jun", students: 750 },
];

const barData = [
  { category: "Excellent", count: 340 },
  { category: "Good", count: 450 },
  { category: "Average", count: 280 },
  { category: "Below Avg", count: 120 },
  { category: "Poor", count: 44 },
];

export const ChartCard = ({ title, description, type }: ChartCardProps) => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          {type === "line" ? (
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip />
              <Line type="monotone" dataKey="students" stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          ) : (
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="category" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(var(--primary))" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
