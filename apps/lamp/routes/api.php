<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DiagnosisController;
use App\Http\Controllers\DiagnosisResultController;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\ChangeController;
use App\Http\Controllers\NotificationController;

// Route::get('/test', function () {
//     return response()->json(['message' => 'ok']);
// });

Route::post('/diagnosis', [DiagnosisController::class, 'store']);
Route::get('/diagnosis-results/{id}', [DiagnosisController::class, 'show']);
Route::get('/ranking/{topType}', [DiagnosisResultController::class, 'ranking']);

// 認証
Route::prefix('lamp')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/logs', [LogController::class, 'index']);
        Route::post('/logs', [LogController::class, 'store']);
        Route::get('/logs/{log}', [LogController::class, 'show']);
        Route::put('/logs/{log}',    [LogController::class, 'update']);
        Route::delete('/logs/{log}', [LogController::class, 'destroy']);
    });
});

// 認証必須
Route::middleware('auth:sanctum')->prefix('lamp')->group(function () {
    Route::get('/home', [HomeController::class, 'show']);         // TODO
    Route::post('/logs', [LogController::class, 'store']);        // TODO
    Route::get('/logs', [LogController::class, 'index']);         // TODO
    Route::get('/changes', [ChangeController::class, 'index']);   // TODO
    Route::get('/notifications', [NotificationController::class, 'index']); // TODO
    Route::post('/notifications/toggle', [NotificationController::class, 'toggle']); // TODO
});
