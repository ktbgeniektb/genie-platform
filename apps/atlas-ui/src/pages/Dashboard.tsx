import { KPICard } from "@/components/Dashboard/KPICard";
import { ChartCard } from "@/components/Dashboard/ChartCard";
import { Users, TrendingUp, BarChart3, GraduationCap } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of student progress and hiring metrics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="26卒内定出し"
          value="68 / 70"
          change="+3"
          trend="up"
          icon={Users}
        />
        <KPICard
          title="26卒内定承諾"
          value="31 / 35"
          change="+3"
          trend="up"
          icon={GraduationCap}
        />
        <KPICard
          title="26卒説明会着席数（年次）"
          value="4,557 / 5,000"
          change="+12"
          trend="up"
          icon={TrendingUp}
        />
        <KPICard
          title="26卒説明会着席数（月次）"
          value="30 / 20"
          change="+12"
          trend="up"
          icon={BarChart3}
        />

        <KPICard
          title="27卒内定出し"
          value="0 / 70"
          change="0"
          trend="neutral"
          icon={Users}
        />
        <KPICard
          title="27卒内定承諾"
          value="0 / 35"
          change="0"
          trend="neutral"
          icon={GraduationCap}
        />
        <KPICard
          title="27卒説明会着席数（年次）"
          value="2,624 / 7,500"
          change="+8"
          trend="up"
          icon={TrendingUp}
        />
        <KPICard
          title="27卒説明会着席数（月次）"
          value="185 / 365"
          change="+10"
          trend="up"
          icon={BarChart3}
        />
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Student Enrollment"
          description="Monthly enrollment trends"
          type="line"
        />
        <ChartCard
          title="Performance Distribution"
          description="Student performance by category"
          type="bar"
        />
      </div>
    </div>
  );
};

export default Dashboard;
