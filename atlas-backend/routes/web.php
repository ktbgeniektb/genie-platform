<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AiInterviewController;

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