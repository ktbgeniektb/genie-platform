import { useEffect, useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { templates } from "../templates/template";
import RadarChartComponent from "../components/RadarChartComponent";
import SNSShareComponent from "../components/SNSShareComponent";
import { typeLabels, typeColors } from "../constants/typeInfo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Target, Lightbulb, RefreshCw, Trophy } from "lucide-react";
import axios from "axios";

const ResultPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [result, setResult] = useState<any>(null);
  const [template, setTemplate] = useState<any>(null);
  const [ranking, setRanking] = useState<any>(null);
  const navigate = useNavigate();

  // ① クエリ取得
  const queryParams = new URLSearchParams(location.search);
  const top1 = queryParams.get("top1");
  const top2 = queryParams.get("top2");

  // ② 通常のIDありの診断取得
  useEffect(() => {
    if (!id) return;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/diagnosis-results/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const normalize = (val: number) => Math.round((Number(val) / 65.5) * 100);
        const normalizedScore = {
          kyomei: normalize(data.score.kyomei),
          hyougen: normalize(data.score.hyougen),
          tankyu: normalize(data.score.tankyu),
          chosen: normalize(data.score.chosen),
          taiken: normalize(data.score.taiken),
        };
        setResult({ ...data, normalizedScore });
        const tmpl = templates.find((t) => t.main === data.top_type);
        setTemplate(tmpl);
      })
      .catch((err) => console.error("診断結果取得エラー", err));
  }, [id]);

  // ③ top1/top2指定時（URLクエリパラメータ）
  useEffect(() => {
    if (id || !top1 || !top2) return;

    const key = `${top1}_${top2}`;
    const tmpl = templates.find((t) => t.main === key);
    if (tmpl) {
      setResult({
        top_type: key,
        normalizedScore: null,
      });
      setTemplate(tmpl);
    }
  }, [id, top1, top2]);

  // ④ ランキング取得
  useEffect(() => {
    if (!result?.top_type) return;
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/ranking/${result.top_type}`)
      .then((res) => setRanking(res.data))
      .catch((err) => console.error("❌ ランキング取得エラー", err));
  }, [result?.top_type]);

  // ⑤ 表示処理
  if (!result || !template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-pulse-soft text-lg text-muted-foreground">
            診断結果を読み込み中...
          </div>
        </motion.div>
      </div>
    );
  }

  const [main1, main2] = result.top_type.split("_");
  const rawTop1 = top1 || main1;
  const rawTop2 = top2 || main2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 relative overflow-hidden">
      {/* Ambient light effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-soft" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse-soft" style={{ animationDelay: "1s" }} />
      </div>

      {/* Header with logo */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 py-6 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <Link to="/">
            <h1 className="text-2xl font-light text-primary hover:opacity-80 transition-smooth">
              Lamp
            </h1>
          </Link>
        </div>
      </motion.header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
        {/* Hero Section - Cinematic with Depth */}
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative -mx-4 sm:mx-0 sm:rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Background Image */}
          <div className="relative h-[65vh] md:h-[75vh] min-h-[420px]">
            <img
              src={`${import.meta.env.BASE_URL}images/results/${rawTop1}_${rawTop2}.jpg`}
              alt="Vision Source"
              className="w-full h-full object-cover object-center"
            />

            {/* Layered gradients for cinematic tone */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20" />

            {/* Subtle particle lights */}
            <div className="absolute inset-0 opacity-30">
              <motion.div
                className="absolute top-1/3 left-1/4 w-2 h-2 bg-white rounded-full blur-sm"
                animate={{ y: [-15, 15], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
              />
              <motion.div
                className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-primary rounded-full blur-sm"
                animate={{ y: [15, -15], opacity: [0.2, 0.7, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", delay: 1 }}
              />
            </div>
            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col justify-between text-center px-6 md:px-12 py-20 md:py-28">
              {/* 上部キャッチコピー */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="relative z-10 max-w-3xl mx-auto"
              >
                <p
                  className="text-white text-lg sm:text-xl md:text-3xl font-light leading-relaxed drop-shadow-[0_3px_8px_rgba(0,0,0,0.7)]"
                  dangerouslySetInnerHTML={{ __html: template.catch }}
                />
              </motion.div>

              {/* 下部タイトル */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="relative z-10 space-y-3 max-w-4xl mx-auto pb-4"
              >
                <p className="text-white/80 text-sm md:text-base font-light tracking-wide">
                  あなたの「ビジョンの源泉」は
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight drop-shadow-[0_3px_10px_rgba(0,0,0,0.7)]">
                  <span
                    style={{ color: typeColors[rawTop1] }}
                    className="font-semibold drop-shadow-[0_3px_10px_rgba(0,0,0,0.7)]"
                  >
                    {typeLabels[rawTop1]}
                  </span>
                  <span className="mx-2 md:mx-4 text-white/70">×</span>
                  <span
                    style={{ color: typeColors[rawTop2] }}
                    className="font-semibold drop-shadow-[0_3px_10px_rgba(0,0,0,0.7)]"
                  >
                    {typeLabels[rawTop2]}
                  </span>
                </h2>
              </motion.div>
            </div>
          </div>
        </motion.section>


        {/* Description Card - Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-white/20 shadow-xl">
            <CardContent className="p-8 md:p-12">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-foreground/90 text-lg md:text-xl leading-relaxed font-light"
                dangerouslySetInnerHTML={{ __html: template.description }}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Radar Chart - Glassmorphism */}
        {result.normalizedScore && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 rounded-3xl shadow-xl p-8">
              <RadarChartComponent score={result.normalizedScore} />
            </div>
          </motion.div>
        )}

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl font-light">
                <Sparkles className="w-6 h-6 text-primary" />
                特徴
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {template.features.map((f: string, i: number) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="flex items-start gap-3 text-foreground/90"
                  >
                    <span className="text-primary mt-1">•</span>
                    <span className="flex-1">{f}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Moments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl font-light">
                <span className="text-2xl">🌱</span>
                ワクワクしやすい瞬間
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {template.moments.map((m: string, i: number) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-start gap-3 text-foreground"
                  >
                    <span className="text-primary mt-1">•</span>
                    <span className="flex-1">{m}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl font-light">
                <Target className="w-6 h-6 text-primary" />
                活かすヒント
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {template.tips.map((t: string, i: number) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex items-start gap-3 text-foreground"
                  >
                    <span className="text-primary mt-1">•</span>
                    <span className="flex-1">{t}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sub Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl font-light">
                <Lightbulb className="w-6 h-6 text-primary" />
                あなたの中に、こんな側面も…
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p
                className="text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: template.sub }}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* SNS Share */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="shadow-medium">
            <CardContent className="py-8">
              <SNSShareComponent id={id} topType={template.label} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Ranking */}
        {ranking && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="shadow-medium bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="py-8 text-center">
                <Trophy className="w-12 h-12 text-primary mx-auto mb-4" />
                <p className="text-foreground text-lg">
                  あなたのタイプ「{typeLabels[rawTop1]} × {typeLabels[rawTop2]}」は
                  <br />
                  <strong className="text-2xl text-primary">
                    {ranking.rank}位 / 全{ranking.total}タイプ
                  </strong>{" "}
                  中でした！
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col md:flex-row gap-4 justify-center max-w-4xl mx-auto"
        >
          <Link to="/types" className="flex-1 md:flex-initial">
            <Button
              variant="outline"
              size="lg"
              className="w-full px-8 py-6 text-base rounded-2xl backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 border-white/30 hover:bg-white/70 dark:hover:bg-gray-900/70 transition-smooth"
            >
              他のタイプも見てみる
            </Button>
          </Link>
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="flex-1 md:flex-initial px-8 py-6 text-base rounded-2xl bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:scale-105 transition-smooth"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            もう1度診断してみる
          </Button>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="relative z-10 py-12 text-center text-sm text-muted-foreground/70"
      >
        <p className="font-light tracking-wide">あなたらしさを、もっと知る旅へ</p>
      </motion.footer>
    </div>
  );
};

export default ResultPage;
