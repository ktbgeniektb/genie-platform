<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AiInterviewOpenAiController;
use App\Http\Controllers\AiInterviewGeminiController;
use App\Http\Controllers\FavoritesController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/interview', function () {
    return view('interview.index');
});
Route::get('/interview/chat', function () {
    return view('interview.chat');
});
Route::post('/interview/submit', [AiInterviewController::class, 'submit']);

// routes/web.php

// Gemini版
Route::get('/interview-gemini/chat', fn() => view('interview.chat')); // 同じでOK
Route::post('/interview-gemini/submit', [AiInterviewGeminiController::class, 'submit']);

// 好きの棚卸しフォーム（表示用）
Route::get('/favorites', function () {
    return view('favorites/form');
});
// フォーム送信処理
Route::post('/favorites/submit', [FavoritesController::class, 'submit']);

Route::get('/deepdive/generated', [DeepDiveController::class, 'show']);

Route::get('/deepdive/answer', [DeepDiveController::class, 'answer']);
Route::post('/deepdive/answer', [DeepDiveController::class, 'answer']);
