import * as React from "react";
import { Box, Typography, Stepper, Step, StepLabel, StepContent, StepConnector, stepConnectorClasses } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.vertical}`]: {
    marginLeft: 14, // バッジ中央の位置
    padding: 0,
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.divider,
    borderLeftWidth: 2,
    minHeight: 24,
  },
}));

// カード（グラデ＋角丸）
const Card = styled(Box)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(3),
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  border: "1px solid",
  borderColor: theme.palette.divider,
  background: "#fff",
  height: "100%",
}));

function VisionCard({ title, accent, steps }) {
  return (
    <Card sx={{ background: `linear-gradient(180deg, ${accent}, #FFFFFF 60%)` }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {title}
      </Typography>

      <Stepper
        orientation="vertical"
        connector={<CustomConnector />}  // ← 数字同士の間に線
        sx={{
          "& .MuiStep-root": { pb: 1 },
          // StepContent の既定ラインを“完全”に消す
          "& .MuiStepContent-root": {
            borderLeft: "none !important",
            ml: 0,
            pl: 0,
          },
          // ラベルとアイコンの縦位置を上揃えに
          "& .MuiStepLabel-root": { alignItems: "flex-start" },
          // アイコンコンテナの右余白（テキストとの間隔）
          "& .MuiStepLabel-iconContainer": { pr: 1.25 },
          "& .MuiStepLabel-label": { fontWeight: 700, fontSize: "0.95rem" },
        }}
      >
        {steps.map((s, idx) => (
          <Step key={s.label} active>
            <StepLabel
              StepIconComponent={() => (
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 13,
                    fontWeight: 700,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                  }}
                >
                  {idx + 1}
                </Box>
              )}
            >
              {s.label}
            </StepLabel>

            {/* 説明は少し右に寄せる */}
            <StepContent>
              <Typography color="text.secondary" sx={{ mt: 0.5, ml: 4 }}>
                {s.description}
              </Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Card>
  );
}


export default function HowSection() {
  const lampSteps = [
    { label: "質問に答える", description: "30問の設問で自分が何にエネルギーを感じるかを診断" },
    { label: "タイプ診断＆グラフ表示", description: "5つのビジョンタイプをスコア化しレーダーチャートで可視化" },
    { label: "AIで“なぜ”を深掘り", description: "それぞれのタイプに合わせたフローで「好きの本質」を探る" },
  ];
  const atlasSteps = [
    { label: "データを取り込む", description: "説明会予約やES提出のフォームから自動でデータを集約" },
    { label: "学生を一元管理", description: "一覧・詳細表示、検索、卒業年別管理が可能" },
    { label: "採用を可視化", description: "ES提出率やイベント効果、Lamp診断のマッチ度をダッシュボードで表示" },
  ];
  const carpetSteps = [
    { label: "自己分析ツールで診断", description: "Lampの定期コーチングとテストの結果から、生徒それぞれの得意や興味を可視化" },
    { label: "結果を共有・分析", description: "教員・保護者向けダッシュボードで生徒の傾向を把握" },
    { label: "指導・進路に活用", description: "面談記録や推奨進路を管理し、探究学習や進路指導をサポート" },
  ];

  return (
    <Box
      component="section"
      sx={{
        backgroundImage: "url('/img/form.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        py: { xs: 6, md: 10 },
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 4 } }}>
        {/* sm以上は3列で固定 */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" },
            gap: 3,
          }}
        >
          <VisionCard title="🟢 Lamp：自己理解支援ツール" accent="#FAF3E0" steps={lampSteps} />
          <VisionCard title="🔵 Atlas：企業向け採用支援システム" accent="#E6F0F8" steps={atlasSteps} />
          <VisionCard title="🟣 Carpet：教育現場支援システム" accent="#F3E6F5" steps={carpetSteps} />
        </Box>
      </Box>
    </Box>
  );
}
