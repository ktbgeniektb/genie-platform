import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logs } from "@/api/logs";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Lightbulb } from "lucide-react";

const LogCreate = () => {
  const navigate = useNavigate();
  const [industry, setIndustry] = useState("教育");
  const [text, setText] = useState("");
  const [emotions, setEmotions] = useState("ワクワク,違和感");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");

    if (!industry || !text || !emotions) {
      toast.error("すべての項目を入力してください。");
      return;
    }

    setLoading(true);

    try {
      const emo = emotions.split(",").map((s) => s.trim()).filter(Boolean);
      await Logs.create({ industry, text, emotions: emo });
      toast.success("ログを保存しました！");
      navigate("/logs");
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
    <div className="page-transition min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <header className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/home")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            ホームに戻る
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Lightbulb className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">新規ログ作成</h1>
          </div>
          <p className="text-muted-foreground">
            今日の経験や気づきを自由に書いてみよう。
          </p>
        </header>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="industry">業種</Label>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger id="industry">
                <SelectValue placeholder="業種を選択してください" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="教育">教育</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="福祉">福祉</SelectItem>
                <SelectItem value="金融">金融</SelectItem>
                <SelectItem value="その他">その他</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="text">本文（50文字以上）</Label>
            <Textarea
              id="text"
              placeholder="感じたこと、学んだこと、印象に残ったことを自由に書いてください。"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[250px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emotions">感情（カンマ区切り）</Label>
            <Input
              id="emotions"
              placeholder="例：ワクワク,達成感,不安"
              value={emotions}
              onChange={(e) => setEmotions(e.target.value)}
            />
          </div>

          {err && <p className="text-red-500 text-sm">{err}</p>}

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "保存中..." : "保存する"}
            </Button>
            <Button variant="outline" onClick={() => navigate("/home")}>
              キャンセル
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogCreate;