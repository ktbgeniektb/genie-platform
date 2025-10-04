// src/pages/LogCreate.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logs } from "@/api/logs";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowLeftCircle } from "lucide-react";

export default function LogCreatePage() {
  const [industry, setIndustry] = useState("教育");
  const [text, setText] = useState("");
  const [emotions, setEmotions] = useState("ワクワク,違和感");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const emo = emotions.split(",").map((s) => s.trim()).filter(Boolean);
      await Logs.create({ industry, text, emotions: emo });

      toast.success("ログを保存しました！");
      nav("/logs");
    } catch (e: any) {
      const msg =
        e?.data?.errors?.text?.[0] ||
        e?.data?.message ||
        "保存に失敗しました";
      setErr(msg);
      toast.error("保存に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-transition min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg border-border">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <ArrowLeftCircle
              className="cursor-pointer text-muted-foreground hover:text-primary transition"
              onClick={() => nav("/logs")}
            />
            <CardTitle className="text-2xl font-bold">ログを残す</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            今日の経験や気づきを自由に書いてみよう。
          </p>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">業種</label>
              <Input
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="例：教育、IT、福祉など"
              />
            </div>

            <div>
              <label className="text-sm font-medium">本文（50文字以上）</label>
              <Textarea
                rows={6}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="感じたこと、学んだこと、印象に残ったことを自由に書いてください。"
              />
            </div>

            <div>
              <label className="text-sm font-medium">感情（カンマ区切り）</label>
              <Input
                value={emotions}
                onChange={(e) => setEmotions(e.target.value)}
                placeholder="例：ワクワク,達成感,不安"
              />
            </div>

            {err && <p className="text-red-500 text-sm">{err}</p>}
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "保存中..." : "保存する"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
