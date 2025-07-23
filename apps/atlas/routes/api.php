<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\StudentController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// 🔓 認証なしでアクセスできるAPI（必要に応じてauth:sanctum付けてもOK）
Route::get('/students', [StudentController::class, 'index']);
Route::post('/students', [StudentController::class, 'store']);
Route::put('/students/{id}', [StudentController::class, 'update']);
Route::delete('/students/{id}', [StudentController::class, 'destroy']);
