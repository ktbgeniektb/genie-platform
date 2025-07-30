<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DiagnosisController;
use App\Http\Controllers\DiagnosisResultController;

// Route::get('/test', function () {
//     return response()->json(['message' => 'ok']);
// });

Route::post('/diagnosis', [DiagnosisController::class, 'store']);
Route::get('/diagnosis-results/{id}', [DiagnosisController::class, 'show']);
Route::get('/ranking/{topType}', [DiagnosisResultController::class, 'ranking']);