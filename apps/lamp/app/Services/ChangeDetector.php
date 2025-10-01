<?php
// app/Services/ChangeDetector.php

namespace App\Services;

use App\Models\Log;
use App\Models\ChangeEvent;


/**
 * ChangeDetector
 *
 * 学生のログ本文を Lamp の診断テーマ辞書と突き合わせて
 * 「変化イベント（NEW_THEME / INTENSITY_UP / FREQ_UP）」を検出するサービスクラス。
 *
 * 役割：
 * - 本文の正規化
 * - 辞書の読み込み（config/lamp_themes.php）
 * - キーワードマッチによるテーマ抽出
 * - 変化イベントの生成と保存
 * - API返却用の配列化
 */
class ChangeDetector
{
    public function detectAndStore(int $userId, Log $log): array
    {
        // 1. 本文取り出し
        $rawText = $this->extractText($log);
        $text    = $this->normalize($rawText);

        // 2. テーマ辞書ロード
        $themes = $this->themeConfig();

        // 3. マッチング
        $hits = $this->extractThemes($text, $themes);

        $events = [];
        foreach ($hits as $theme => $count) {
            // 4. 初出かどうか判定
            $exists = ChangeEvent::where('user_id', $userId)
                ->where('theme', $theme)
                ->exists();

            $type = $exists ? 'FREQ_UP' : 'NEW_THEME';

            // 5. DB保存
            $event = ChangeEvent::create([
                'user_id' => $userId,
                'log_id'  => $log->id,
                'theme'   => $theme,
                'type'    => $type,
                'details' => ['hits' => $count],
            ]);

            // 6. API返却用に整形
            $events[] = [
                'id'      => $event->id,
                'theme'   => $event->theme,
                'type'    => $event->type,
                'details' => $event->details,
            ];
        }

        return $events;
    }

    private function extractText(Log $log): string
    {
        return $log->content ?? $log->text ?? '';
    }

    private function normalize(string $text): string
    {
        $text = mb_strtolower($text);
        return preg_replace('/\s+/u', '', $text);
    }

    private function themeConfig(): array
    {
        return config('lamp_themes', []);
    }

    private function extractThemes(string $text, array $themes): array
    {
        $hits = [];
        foreach ($themes as $theme => $keywords) {
            foreach ($keywords as $kw) {
                if (mb_strpos($text, $kw) !== false) {
                    $hits[$theme] = ($hits[$theme] ?? 0) + 1;
                }
            }
        }
        return $hits;
    }
}