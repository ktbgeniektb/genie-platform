<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\StudentController;

Route::apiResource('students', StudentController::class);