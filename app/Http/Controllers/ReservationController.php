<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Experience;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    public function store(Request $request)
    {        
        $validated = $request->validate([
            'experience_id' => 'required|exists:experiences,id',
            'user_id' => 'required|exists:users,id',
            'experience_date' => 'required|date',
            'people_amount' => 'required|integer|min:1',
            'reservation_price' => 'required|numeric',
        ]);
        $reservation = Reservation::create($validated);
        return response()->json($reservation, 201);
    }

    public function myReservations()
    {
        $user = Auth::user();
        $reservations = \App\Models\Reservation::with('experience')
            ->where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->get();
        return response()->json($reservations);
    }
}
