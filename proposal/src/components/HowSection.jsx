import * as React from "react";
import {
  Box, Typography, Stepper, Step, StepLabel, StepContent, StepConnector, stepConnectorClasses
} from "@mui/material";
import { styled } from "@mui/material/styles";

/* --- WhoSection風の“霜ガラス”カード --- */
const FrostedCard = styled(Box)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(3),
  background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02) 60%)",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  border: "1px solid rgba(255,255,255,0.10)",
  boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
  transition: "transform .2s ease, box-shadow .2s ease",
  height: "100%",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 16px 32px rgba(0,0,0,0.20)"
  }
}));

/* 数字バッジ中心を通るカスタム縦コネクタ（白の半透明） */
const CustomConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.vertical}`]: { marginLeft: 14, padding: 0 },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "rgba(255,255,255,0.25)",
    borderLeftWidth: 2,
    minHeight: 24
  }
}));

function VisionCard({ title, steps }) {
  return (
    <FrostedCard>
      <Typography variant="h6" fontWeight={800} sx={{ color: "#F6E05E", mb: 1 }}>
        {title}
      </Typography>

      <Stepper
        orientation="vertical"
        connector={<CustomConnector />}
        sx={{
          "& .MuiStep-root": { pb: 1 },
          "& .MuiStepContent-root": { borderLeft: "none !important", ml: 0, pl: 0 },
          "& .MuiStepLabel-root": { alignItems: "flex-start" },
          "& .MuiStepLabel-iconContainer": { pr: 1.25 },
          "& .MuiStepLabel-label": {
            fontWeight: 700,
            fontSize: "0.95rem",
            color: "#F6E05E", // 通常時
          },
          "& .MuiStepLabel-label.Mui-active": {
            color: "#F6E05E", // ← アクティブ時も上書き
          }
        }}
      >
        {steps.map((s, idx) => (
          <Step key={s.label} active>
            <StepLabel
              StepIconComponent={() => (
                <Box
                  sx={{
                    width: 28, height: 28, borderRadius: "50%",
                    display: "grid", placeItems: "center",
                    fontSize: 13, fontWeight: 700,
                    color: "#fff",
                    bgcolor: "#111",
                    border: "1px solid rgba(255,255,255,0.4)"
                  }}
                >
                  {idx + 1}
                </Box>
              )}
            >
              {s.label}
            </StepLabel>
            <StepContent>
              <Typography sx={{ mt: 0.5, ml: 4, color: "rgba(255,255,255,0.8)" }}>
                {s.description}
              </Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </FrostedCard>
  );
}

export default function HowSection() {
  const lampSteps = [
    { label: "質問に答える", description: "30問の設問で自分が何にエネルギーを感じるかを診断" },
    { label: "タイプ診断＆グラフ表示", description: "5つのビジョンタイプをスコア化しレーダーチャートで可視化" },
    { label: "AIで“なぜ”を深掘り", description: "それぞれのタイプに合わせたフローで「好きの本質」を探る" }
  ];
  const atlasSteps = [
    { label: "データを取り込む", description: "説明会予約やES提出のフォームから自動でデータを集約" },
    { label: "学生を一元管理", description: "一覧・詳細表示、検索、卒業年別管理が可能" },
    { label: "採用を可視化", description: "ES提出率・イベント効果、Lamp診断のマッチ度をダッシュボードで表示" }
  ];
  const carpetSteps = [
    { label: "自己分析ツールで診断", description: "定期コーチングとテストで得意・興味を可視化" },
    { label: "結果を共有・分析", description: "教員・保護者向けダッシュボードで傾向を把握" },
    { label: "指導・進路に活用", description: "面談記録や推奨進路を管理し、探究学習や進路指導をサポート" }
  ];

  return (
    <Box
      component="section"
      sx={{
        background: "linear-gradient(to bottom, #000, #0B0F2A 40%, #0B1B3A)",
        position: "relative",
        py: { xs: 6, md: 10 }
      }}
    >
      {/* 上端の金ライン */}
      <Box
        sx={{
          position: "absolute",
          insetInline: 0,
          top: 0,
          height: 2,
          background: "linear-gradient(90deg, transparent, #F6E05E, transparent)",
          opacity: 0.8,
          pointerEvents: "none"
        }}
      />
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" },
            gap: 3
          }}
        >
          <VisionCard title="Lamp：自己理解支援ツール" steps={lampSteps} />
          <VisionCard title="Atlas：企業向け採用支援システム" steps={atlasSteps} />
          <VisionCard title="Carpet：教育現場支援システム" steps={carpetSteps} />
        </Box>
      </Box>
    </Box>
  );
}
