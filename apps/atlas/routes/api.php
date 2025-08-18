<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\StudentController;

// Route::middleware('auth:sanctum')->group(function () {
    // 認証が必要なAPI
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/students', [StudentController::class, 'index']);
    Route::get('/students/{student}', [StudentController::class, 'show']);
    Route::post('/students', [StudentController::class, 'store']);
    Route::put('/students/{student}', [StudentController::class, 'update']);
    Route::delete('/students/{student}', [StudentController::class, 'destroy']);
    Route::get('/students/{student}', [StudentController::class, 'show']);
// });
