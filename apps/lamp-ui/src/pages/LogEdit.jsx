// src/pages/LogEdit.tsx（ts or tsx に変更）

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Logs } from "@/api/logs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

export default function LogEdit() {
  const { id } = useParams();
  const nav = useNavigate();
  const [industry, setIndustry] = useState("");
  const [text, setText] = useState("");
  const [emotions, setEmotions] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    Logs.show(id)
      .then((data) => {
        setIndustry(data.industry ?? "");
        setText(data.content ?? data.text ?? "");
        setEmotions(Array.isArray(data.emotions) ? data.emotions.join(",") : "");
      })
      .catch((e) => setErr(e?.data?.message || "取得に失敗しました"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await Logs.update(id, {
        industry,
        text,
        emotions: emotions.split(",").map((e) => e.trim()).filter(Boolean),
      });
      toast.success("ログを更新しました！");
      nav(`/logs/${id}`);
    } catch (e) {
      setErr(e?.data?.message || "更新に失敗しました");
      toast.error("更新に失敗しました");
    }
  };

  if (loading) return <main className="p-8 text-center">読み込み中...</main>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 py-10">
      <div className="container mx-auto max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => nav(`/logs/${id}`)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> 戻る
          </Button>
          <h1 className="text-2xl font-bold">ログ編集</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-2xl shadow-md">
          <div>
            <label className="block mb-2 text-sm font-medium text-muted-foreground">業種</label>
            <Input value={industry} onChange={(e) => setIndustry(e.target.value)} required />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-muted-foreground">本文</label>
            <Textarea rows={6} value={text} onChange={(e) => setText(e.target.value)} required />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-muted-foreground">感情（カンマ区切り）</label>
            <Input value={emotions} onChange={(e) => setEmotions(e.target.value)} />
          </div>

          {err && <p className="text-destructive">{err}</p>}

          <div className="flex justify-end">
            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" /> 更新する
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
