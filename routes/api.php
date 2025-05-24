<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExperienceController;

Route::apiResource('experiences', ExperienceController::class);
Route::get('/xd', function () {
    return response()->json(['message' => 'Hello, World!']);
})->name('xd');