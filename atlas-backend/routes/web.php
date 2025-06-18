<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AiInterviewOpenAiController;
use App\Http\Controllers\AiInterviewGeminiController;

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
