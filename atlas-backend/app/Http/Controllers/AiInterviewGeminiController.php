<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AiInterviewController extends Controller
{
    public function submit(Request $request)
    {
        $answers = $request->input('answers');

        // 回答を文字列にまとめる
        $joined = collect($answers)->map(function ($a, $i) {
            return chr(65 + $i) . ". " . $a['text'];
        })->implode("\n");

        $prompt = <<<EOT
あなたは“自己分析面談の専門家AI”です。
以下の質問に対して、回答者の価値観やビジョンの原型を引き出す診断をしてください。

【質問と回答】
{$joined}

掘り下げるときは「なぜそう感じるの？」「何が嬉しかったの？」など、やさしく問いかけてください。
最後に、回答者の価値観の傾向を1〜2文でまとめてください。
EOT;

        // Gemini API に送信
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' . config('services.gemini.key'),
            [
                'contents' => [
                    [
                        'role' => 'user',
                        'parts' => [
                            ['text' => $prompt]
                        ]
                    ]
                ],
                'generationConfig' => [
                    'temperature' => 0.8,
                ],
            ]
        );

        // 応答を取得
        $content = $response->json()['candidates'][0]['content']['parts'][0]['text'] ?? '❌ 回答の取得に失敗しました';

        return view('interview.result', compact('content'));
    }
}
