<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AiInterviewOpenAiController;
use App\Http\Controllers\AiInterviewGeminiController;
use App\Http\Controllers\FavoritesGeminiController;
use App\Http\Controllers\FavoritesGptController;
use App\Http\Controllers\DeepDiveGptController;


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
Route::get('/favorites-gemini', function () {
    return view('favorites-gemini/form');
});
// 好きの棚卸しフォーム（表示用）
Route::get('/favorites-gpt', function () {
    return view('favorites-gpt/form');
});
// フォーム送信処理
Route::post('/favorites-gemini/submit', [FavoritesGeminiController::class, 'submit']);
Route::post('/favorites-gpt/submit', [FavoritesGptController::class, 'submit']);

Route::get('/result', function () {
    $questions = session('questions');
    return view('result', compact('questions'));
})->name('result.view');
// Route::get('/deepdive/generated', [DeepDiveGptController::class, 'show']);
// Route::post('/deepdive/submit', [DeepDiveGptController::class, 'submit']);

// Route::get('/deepdive/answer', [DeepDiveGptController::class, 'answer']);
// Route::post('/deepdive/answer', [DeepDiveGptController::class, 'answer']);


// Route::get('/deepdive/chat', function () {
//     return view('deepdive.chat');
// });
// Route::post('/deepdive/chat', [DeepDiveGptController::class, 'chat']);
// Route::get('/deepdive/chat', [DeepDiveGptController::class, 'chatPage']);
// Route::post('/deepdive/chat', [DeepDiveGptController::class, 'chat']);
