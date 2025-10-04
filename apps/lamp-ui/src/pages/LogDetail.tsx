import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Logs } from "@/api/logs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Trash2, PenSquare } from "lucide-react";

export default function LogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<any>(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Logs.show(id)
      .then(setItem)
      .catch((e) => setErr(e?.data?.message || "取得に失敗しました"))
      .finally(() => setLoading(false));
  }, [id]);

  const onDelete = async () => {
    if (!confirm("このログを削除します。よろしいですか？")) return;
    try {
      await Logs.destroy(id);
      toast.success("ログを削除しました");
      navigate("/logs");
    } catch (e) {
      toast.error(e?.data?.message || "削除に失敗しました");
    }
  };

  if (loading) return <p className="p-6 text-center text-muted-foreground">読み込み中…</p>;
  if (err) return <p className="p-6 text-center text-red-500">{err}</p>;
  if (!item) return <p className="p-6 text-center text-muted-foreground">データが見つかりません。</p>;

  const emotions = Array.isArray(item.emotions)
    ? item.emotions
    : typeof item.emotions === "string"
    ? item.emotions.split(",").map((s) => s.trim())
    : [];

  return (
    <div className="page-transition min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => navigate("/logs")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            一覧へ戻る
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate(`/logs/${id}/edit`)}>
              <PenSquare className="mr-2 h-4 w-4" /> 編集
            </Button>
            <Button variant="destructive" onClick={onDelete}>
              <Trash2 className="mr-2 h-4 w-4" /> 削除
            </Button>
          </div>
        </div>

        {/* Content */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{item.industry || "ログ詳細"}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {new Date(item.created_at).toLocaleString()}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <strong>感情:</strong>{" "}
              {emotions.length ? emotions.join(" / ") : "—"}
            </div>
            <p className="whitespace-pre-wrap leading-relaxed">
              {item.content || item.text || "（本文なし）"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
