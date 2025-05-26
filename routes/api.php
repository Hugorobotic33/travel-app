<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\ReservationController;

Route::apiResource('experiences', ExperienceController::class);
Route::apiResource('reservations', ReservationController::class);

Route::middleware('auth:sanctum')->get('my-reservations', [ReservationController::class, 'myReservations']);