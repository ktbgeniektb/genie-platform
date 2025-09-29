<?php
// app/Services/ChangeDetector.php

namespace App\Services;

use App\Models\Log;

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
    /**
     * ログを入力に取り、検出したイベントを返す。
     */
    public function detectAndStore(int $userId, Log $log): array
    {
        //本文取り出し
        $rawText = $this->extractText($log);

        //正規化
        $text = $this->normalize($rawText);
        
        //テーマ辞書と突き合わせ
        $themes = $this->themeConfig();

        // TODO: イベント生成・保存
        return [];
    }
}
