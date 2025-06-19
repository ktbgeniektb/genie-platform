<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;


class FavoritesGeminiController extends Controller
{
    public function submit(Request $request)
    {
        $answers = $request->input('answers');

        // プロンプト作成
        $prompt = "あなたは、自己理解を支援するプロのキャリアカウンセラーです。以下は、ある人の「好きなこと」と「心が震えた原体験」です。";
        foreach ($answers as $set) {
            $prompt .= "- 好きなこと: " . $set['q1'] . "\n";
            $prompt .= "- 心が震えた瞬間: " . $set['q2'] . "\n\n";
        }
        $prompt .= <<<EOT
この情報をもとに、その人の価値観の源泉を引き出すような質問を5つ考えてください。

---

【目的】  
1. 回答者が「自分でも言語化していなかった想い」に気づく  
2. 原体験に込められた“嬉しさ”“誇り”“信じる気持ち”“貢献意欲”を浮き彫りにする  
3. 質問を通じて自己理解を深め、自己信頼を強化する

---

【質問の条件】
- 丁寧で寄り添う口調で問いかけてください
- 一般的ではなく、本人の文脈に沿った具体性のある問いにしてください
- 以下の5つの視点（感情／意味／他者／行動／未来の願い）をそれぞれ1問ずつ含めてください
- 回答者が「これまで考えたことがなかった」と感じるほど、新鮮な切り口を目指してください
- 抽象的すぎる質問（例：「それはどんな意味でしたか？」）や、ただの再確認の質問は避けてください。
- 体験の背景や理由、「なぜそれが自分にとって大切なのか」を問い直すような構造にしてください。
- 「表面的な感情」ではなく、「奥にある価値観」や「人生の方向性」に気づけるような質問にしてください。

---

【出力形式】  
以下のような JSON 配列（文字列のみ）で返してください。番号や装飾、コードブロックは不要です。

```json
[
  "その瞬間、どんな感情が最も強く湧き上がりましたか？",
  "『信じることで力が出た』という経験は、あなたにとってどんな意味がありますか？",
  "チームメンバーと一緒にプレーしたことで、あなたは何を感じ、何を大切に思いましたか？",
  "あのときの行動が、今のあなたの意思決定や行動にどのような影響を与えていますか？",
  "今後も心が震える瞬間を増やすために、どんな挑戦や選択をしていきたいですか？"
]
EOT;

        // APIリクエスト
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post(
                'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=' . config('services.gemini.key'),
            [
                'contents' => [
                    [
                        'role' => 'user',
                        'parts' => [
                            ['text' => $prompt]
                        ]
                    ]
                ]
            ]
        );

        // 応答全体をログ出力
        logger($response->json());

        // レスポンスのJSONを取得
        $text = $response->json()['candidates'][0]['content']['parts'][0]['text'] ?? '[]';
        // コードブロック削除
        $text = trim($text);
        if (str_starts_with($text, '```json')) {
            $text = str_replace(['```json', '```'], '', $text);
            $text = trim($text);
        }

        // JSONを配列に変換
        $questions = json_decode($text, true);

        // バリデーション
        if (!is_array($questions)) {
            $questions = ['❌ Geminiから有効なJSONが返りませんでした'];
        }
                
        // viewに渡す
        // return view('deepdive.generated', compact('questions'));
        return view('favorites-gpt.result', compact('questions'));
    }
}
