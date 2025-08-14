// src/components/TechStackSection.jsx
import * as React from "react";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const FrostedCard = styled(Card)(() => ({
  borderRadius: 16,
  background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02) 60%)",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  border: "1px solid rgba(255,255,255,0.10)",
  boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
  height: "100%",
  transition: "transform .2s ease, box-shadow .2s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 16px 32px rgba(0,0,0,0.2)"
  }
}));

const ITEMS = [
  {
    title: "Laravel",
    caption: "APIサーバー / 認証 / 集計",
    bullets: ["Sanctum/Passport で認証標準化", "バリデーション・ジョブで堅牢運用"]
  },
  {
    title: "React / Next.js",
    caption: "診断UI / 管理画面 / SPA",
    bullets: ["CSRで体験速度優先", "LP/SEOはNextのISRで最適化"]
  },
  {
    title: "Docker",
    caption: "開発=本番の再現性",
    bullets: ["compose up で即環境", ".env分離で設定管理"]
  },
  {
    title: "MySQL",
    caption: "保存 / 検索最適化",
    bullets: ["卒年・イベント・タイプで複合索引", "定期バックアップ+復旧手順"]
  },
  {
    title: "API連携",
    caption: "予約システム / LINEログイン",
    bullets: ["アダプタ層でベンダー差吸収", "Webhookで自動集計へ接続"]
  },
];

function TechCard({ icon, title, caption, bullets }) {
  return (
    <FrostedCard elevation={0}>
      <CardContent>
        <Stack spacing={1.25}>
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <Box sx={{ fontSize: 22, lineHeight: 1 }}>{icon}</Box>
            <Typography variant="h6" fontWeight={800} sx={{ color: "#F6E05E" }}>
              {title}
            </Typography>
          </Stack>

          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
            {caption}
          </Typography>

          <Stack component="ul" spacing={0.5} sx={{ pl: 2, my: 0.5 }}>
            {bullets.map((b, i) => (
              <Typography
                key={i}
                component="li"
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)" }}
              >
                {b}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </FrostedCard>
  );
}

export default function TechStackSection() {
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
        <Stack spacing={1} sx={{ mb: 3 }}>
          <h2 className="text-center font-aladdin text-5xl md:text-6xl text-[#F6E05E] drop-shadow py-16">
            Technology selection
          </h2>
        </Stack>

        {/* 3＋2のグリッド：xs=1列, sm=2列, md=3列 */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
            gap: 3
          }}
        >
          {ITEMS.map((it) => (
            <TechCard key={it.title} {...it} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
