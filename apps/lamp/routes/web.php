<?php

Route::get('/check-env', function () {
    return [
        'DB_USER' => env('DB_USERNAME'),
        'DB_PASS' => env('DB_PASSWORD'),
    ];
});

// use Illuminate\Support\Facades\Route;
// use Inertia\Inertia;
// use App\Http\Controllers\DiagnosisController;

// // Route::post('/test-diagnosis', [DiagnosisController::class, 'store']);

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

// require __DIR__.'/settings.php';
// require __DIR__.'/auth.php';
