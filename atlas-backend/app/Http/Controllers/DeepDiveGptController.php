<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class DeepDiveGptController extends Controller
{
    public function chatPage()
    {
        $answers = session('deepdive_answers', []);
        $questions = session('deepdive_questions', []);

        return view('deepdive.chat', compact('answers', 'questions'));
    }

    public function chat(Request $request)
    {
        $history = $request->input('history', []);
        $lastSet = $request->input('lastSet'); // {q1: "...", q2: "..."}

        $prompt = "あなたは、優秀なキャリアアドバイザーです。\n\n";
        $prompt .= "以下は、ユーザーが「好きだったこと」と「心が震えたできごと」です：\n";
        $prompt .= "- 好きなこと: " . $lastSet['q1'] . "\n";
        $prompt .= "- 心が震えた瞬間: " . $lastSet['q2'] . "\n\n";
        $prompt .= <<<EOT
    この体験をさらに深く理解するために、以下の2つの問いを順に出してください。

    1. この体験の価値観や感情を深掘りする質問（本人の文脈に寄り添って）
    2. 「同じように心が震えた別の体験」を促すブリッジ質問

    【出力形式】
    JSON配列で2つの質問を出力してください。
    EOT;

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . config('services.openai.key'),
        ])->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-4',
            'messages' => [
                ['role' => 'system', 'content' => 'あなたは思いやりあるキャリアアドバイザーです'],
                ['role' => 'user', 'content' => $prompt],
            ],
            'temperature' => 0.8,
        ]);

        $text = $response->json()['choices'][0]['message']['content'] ?? '[]';
        $questions = json_decode($text, true);
        if (!is_array($questions)) {
            $questions = ['❌ GPTから正しく取得できませんでした', ''];
        }

        return response()->json([
            'deepQuestion' => $questions[0],
            'bridgeQuestion' => $questions[1] ?? null,
        ]);
    }

}
