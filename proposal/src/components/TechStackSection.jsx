// src/components/TechStackSection.jsx
import * as React from "react";
import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";

const ITEMS = [
  {
    icon: "🧱",
    title: "Laravel",
    caption: "APIサーバー / 認証 / 集計",
    bullets: ["Sanctum/Passport で認証標準化", "バリデーション・ジョブで堅牢運用"],
    accent: "#FAF3E0",
  },
  {
    icon: "⚛️",
    title: "React / Next.js",
    caption: "診断UI / 管理画面 / SPA",
    bullets: ["CSRで体験速度優先", "LP/SEOはNextのISRで最適化"],
    accent: "#E6F0F8",
  },
  {
    icon: "🐳",
    title: "Docker",
    caption: "開発=本番の再現性",
    bullets: ["compose up で即環境", ".env分離で設定管理"],
    accent: "#F0F7FF",
  },
  {
    icon: "🗄️",
    title: "MySQL",
    caption: "保存 / 検索最適化",
    bullets: ["卒年・イベント・タイプで複合索引", "定期バックアップ+復旧手順"],
    accent: "#F7F7FF",
  },
  {
    icon: "🔗",
    title: "API連携",
    caption: "予約システム / LINEログイン",
    bullets: ["アダプタ層でベンダー差吸収", "Webhookで自動集計へ接続"],
    accent: "#FFF7F2",
  },
];

function TechCard({ icon, title, caption, bullets, accent }) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        background: `linear-gradient(180deg, ${accent}, #FFFFFF 55%)`,
        transition: "transform .2s ease, box-shadow .2s ease",
        "&:hover": { transform: "translateY(-2px)", boxShadow: 2 },
      }}
    >
      <CardContent>
        <Stack spacing={1.25}>
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <Box sx={{ fontSize: 22, lineHeight: 1 }}>{icon}</Box>
            <Typography variant="h6" fontWeight={800}>
              {title}
            </Typography>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            {caption}
          </Typography>

          <Stack component="ul" spacing={0.5} sx={{ pl: 2, my: 0.5 }}>
            {bullets.map((b, i) => (
              <Typography key={i} component="li" variant="body2">
                {b}
              </Typography>
            ))}
          </Stack>

          {/* 任意：タグを出したい時はここに */}
          {/* <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip size="small" label="Laravel 11" variant="outlined" />
          </Stack> */}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function TechStackSection() {
  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 4 }, py: { xs: 6, md: 10 } }}>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography variant="overline" color="text.secondary">
          想定使用技術
        </Typography>
        <Typography variant="h5" fontWeight={900}>
          実運用を見据えた “再現性 × 拡張性” の構成
        </Typography>
        <Typography variant="body2" color="text.secondary">
          API主導で段階的に拡張。既存オペを崩さず連携し、開発=本番の再現性を担保します。
        </Typography>
      </Stack>

      {/* 3＋2のグリッド：xs=1列, sm=2列, md=3列 */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
          gap: 3,
        }}
      >
        {ITEMS.map((it) => (
          <TechCard key={it.title} {...it} />
        ))}
      </Box>
    </Box>
  );
}
