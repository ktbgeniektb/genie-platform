// src/pages/StudentDetail.tsx
import { useQuery } from "@tanstack/react-query";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "@/lib/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  FileText,
  Trash2,
  ArrowLeft,
  Lightbulb,
} from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

async function fetchStudent(id: string) {
  const res = await api.get(`/students/${id}`);
  return res.data;
}

export default function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["student", id],
    queryFn: () => fetchStudent(id!),
    enabled: !!id,
    select: (raw) => ({
      ...raw.student,
      lamp_events: raw.lamp_events ?? [],
    }),
  });

  if (!id) return <div>URLが不正です</div>;
  if (isLoading) return <p className="p-6">読み込み中…</p>;
  if (isError)
    return (
      <div className="p-6">
        <p className="text-destructive mb-2">
          取得に失敗しました：{String(error?.message ?? "")}
        </p>
        <Button asChild variant="outline">
          <Link to="/students">← 一覧へ戻る</Link>
        </Button>
      </div>
    );

  const s = data;

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xl">
            {s.name?.[0] ?? "?"}
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{s.name}</h1>
            <p className="text-muted-foreground text-sm">
              {s.furigana || "ふりがな未設定"} ・{" "}
              {s.graduation_year ? `${s.graduation_year}卒` : "-"} ・{" "}
              {s.education ?? "学歴未設定"}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="default">候補者</Badge>
              {s.address_prefecture && (
                <Badge variant="secondary">{s.address_prefecture}</Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          {s.es_pdf_url && (
            <Button asChild variant="outline" className="gap-1">
              <a href={s.es_pdf_url} target="_blank" rel="noopener noreferrer">
                <FileText className="w-4 h-4" />
                ES PDF
              </a>
            </Button>
          )}
          <Button
            variant="destructive"
            className="gap-1"
            onClick={() => confirm("この学生を削除しますか？")}
          >
            <Trash2 className="w-4 h-4" />
            削除
          </Button>
          <Button asChild variant="ghost" className="gap-1">
            <Link to="/students">
              <ArrowLeft className="w-4 h-4" />
              一覧へ
            </Link>
          </Button>
        </div>
      </div>

      <Separator />

      {/* Lamp診断イベント（TopType強調＋レーダーチャート） */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            Lamp診断イベント
          </CardTitle>
        </CardHeader>

        <CardContent>
          {s.lamp_events?.length ? (
            <div className="space-y-8">
              {s.lamp_events.map((ev, i) => {
                let payload;
                try {
                  payload =
                    typeof ev.payload === "string"
                      ? JSON.parse(ev.payload)
                      : ev.payload;
                } catch {
                  payload = ev.payload;
                }

                const score = payload?.score ?? {};
                const top = payload?.top_type ?? "";

                const data = Object.entries(score).map(([key, value]) => ({
                  subject: key,
                  value: Number(value),
                }));

                return (
                  <div
                    key={i}
                    className="border border-border rounded-xl p-6 bg-card/60 shadow-sm hover:shadow-md transition-all"
                  >
                    {/* 上部タイトル */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                          🧩 {ev.event_type}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(ev.occurred_at).toLocaleString("ja-JP")}
                        </p>
                      </div>

                      {top && (
                        <div className="flex flex-col items-end">
                          <Badge
                            variant="default"
                            className="mt-2 sm:mt-0 bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full shadow-md"
                          >
                            Top Type：{top.replace("_", " ＋ ")}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1 italic">
                            もっとも強く表れたビジョン傾向
                          </p>
                        </div>
                      )}
                    </div>

                    {/* スコア可視化エリア */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                      {/* スコアボックス群 */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {Object.entries(score).map(([k, v]) => {
                          const highlight = top.includes(k);
                          return (
                            <div
                              key={k}
                              className={`rounded-lg p-3 text-center border transition-all ${
                                highlight
                                  ? "border-primary bg-primary/10 text-primary font-semibold scale-[1.03]"
                                  : "border-border bg-muted/20 text-muted-foreground"
                              }`}
                            >
                              <div className="text-xs uppercase tracking-wide">
                                {k}
                              </div>
                              <div className="text-xl font-bold mt-1">
                                {Number(v).toFixed(1)}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* レーダーチャート */}
                      {data.length > 0 && (
                        <div className="h-56 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={data}>
                              <PolarGrid stroke="#334155" />
                              <PolarAngleAxis
                                dataKey="subject"
                                tick={{ fill: "#94a3b8", fontSize: 12 }}
                              />
                              <Radar
                                name="スコア"
                                dataKey="value"
                                stroke="#3b82f6"
                                fill="#3b82f6"
                                fillOpacity={0.35}
                              />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">診断イベントなし</p>
          )}
        </CardContent>
      </Card>
      {/* メモ */}
      <Card>
        <CardHeader>
          <CardTitle>メモ</CardTitle>
        </CardHeader>
        <CardContent>
          {s.application_reason ? (
            <p className="whitespace-pre-wrap text-sm text-foreground bg-muted/20 p-4 rounded-md">
              {s.application_reason}
            </p>
          ) : (
            <p className="text-muted-foreground text-sm">未入力</p>
          )}
        </CardContent>
      </Card>

      {/* 連絡先 */}
      <Card>
        <CardHeader>
          <CardTitle>連絡先</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <CopyField icon={Mail} label="メール" value={s.email} />
          <CopyField icon={Phone} label="携帯電話" value={s.phone} />
        </CardContent>
      </Card>

      {/* 基本情報 */}
      <Card>
        <CardHeader>
          <CardTitle>基本情報</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <Field icon={User} label="氏名" value={s.name} />
          <Field icon={GraduationCap} label="卒業予定" value={`${s.graduation_year ?? "-"}卒`} />
          <Field label="最終学歴（予定）" value={s.education} />
          <Field label="ふりがな" value={s.furigana} />
        </CardContent>
      </Card>

      {/* 住所 */}
      <Card>
        <CardHeader>
          <CardTitle>住所</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <Field label="郵便番号" value={s.postal_code} />
          <Field
            icon={MapPin}
            label="住所"
            value={[s.address_prefecture, s.address_line1]
              .filter(Boolean)
              .join(" ")}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function Field({ icon: Icon, label, value }: any) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-2 text-sm">
      {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
      <span className="text-muted-foreground">{label}：</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}

function CopyField({ icon: Icon, label, value }: any) {
  if (!value) return null;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {}
  };
  return (
    <div className="flex items-center gap-2 text-sm">
      {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
      <span className="text-muted-foreground">{label}：</span>
      <span className="font-medium text-foreground">{value}</span>
      <Button
        size="sm"
        variant="outline"
        className="h-7 px-2 text-xs"
        onClick={copy}
      >
        コピー
      </Button>
    </div>
  );
}
