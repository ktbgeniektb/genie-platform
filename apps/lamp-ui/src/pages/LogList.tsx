// src/pages/LogList.tsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { LogCard } from "@/components/LogCard";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { Logs } from "@/api/logs";
import { token } from "@/api/client";

// === データ正規化ユーティリティ ===
function toDateSafe(v: any) {
  if (!v) return null;
  if (typeof v === "number") return new Date(v);
  if (typeof v === "string") {
    const s = v.trim();
    if (/^\d{13}$/.test(s)) return new Date(Number(s));
    if (/^\d{10}$/.test(s)) return new Date(Number(s) * 1000);
    const iso = s.includes("T") ? s : s.replace(" ", "T");
    const d = new Date(iso);
    return isNaN(d) ? null : d;
  }
  if (typeof v === "object" && v.date) {
    const d = new Date((v.date.includes("T") ? v.date : v.date.replace(" ", "T")));
    return isNaN(d) ? null : d;
  }
  return null;
}

function normalizeEmotions(e: any): string[] {
  if (Array.isArray(e)) return e;
  if (e == null || e === "") return [];
  if (typeof e === "object") {
    return Object.values(e).filter(v => typeof v === "string" && v.trim() !== "");
  }
  if (typeof e === "string") {
    try {
      const parsed = JSON.parse(e);
      if (Array.isArray(parsed)) return parsed;
    } catch {}
    if (e.includes(",")) return e.split(",").map(t => t.trim());
  }
  return [];
}

function normalizeLog(l: any) {
  return {
    id: l.id ?? l.uuid ?? l.ID,
    createdAt: toDateSafe(l.created_at ?? l.createdAt ?? l.created_at_iso ?? l?.created_at?.date),
    industry: l.industry ?? l.category ?? "",
    emotions: normalizeEmotions(l.emotions),
    text: l.text ?? l.body ?? l.content ?? l.message ?? "",
  };
}

// === コンポーネント本体 ===
export default function LogList() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!token.get()) {
      navigate("/login");
      return;
    }
    Logs.list(10)
      .then((res) => {
        const items =
          Array.isArray(res) ? res :
          Array.isArray(res?.data) ? res.data :
          Array.isArray(res?.data?.data) ? res.data.data : [];
        setLogs(items.map(normalizeLog));
      })
      .catch((e) => {
        if (e?.status === 401) {
          token.clear();
          navigate("/login");
          return;
        }
        setErr(e?.data?.message || "取得に失敗しました");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleAddLog = () => navigate("/logs/new");
  const handleLogClick = (logId: number) => navigate(`/logs/${logId}`);

  return (
    <div className="page-transition min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="mb-8">
          <Button variant="ghost" onClick={() => navigate("/home")} className="mb-4">
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
          {loading && <p className="opacity-70">読み込み中...</p>}
          {err && <p className="text-red-500">{err}</p>}
          {!loading && logs.length === 0 && !err && (
            <p className="opacity-70">まだログがありません。</p>
          )}
          {logs.map((log) => (
            <LogCard
              key={log.id}
              title={log.industry || "業種不明"}
              category={log.emotions?.join(" / ") || "—"}
              preview={log.text}
              date={log.createdAt ? log.createdAt.toLocaleString() : "—"}
              onClick={() => handleLogClick(log.id)}
            />
          ))}
        </div>

        <FloatingActionButton onClick={handleAddLog} />
      </div>
    </div>
  );
}
