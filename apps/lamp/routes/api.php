<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DiagnosisController;

Route::post('/diagnosis', [DiagnosisController::class, 'store']);