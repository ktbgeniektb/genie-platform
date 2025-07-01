<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DiagnosisController;

Route::post('/diagnosis', [DiagnosisController::class, 'store']);
Route::get('/diagnosis', [DiagnosisController::class, 'index']); // ← これ追加
Route::get('/ping', fn () => ['message' => 'pong']);