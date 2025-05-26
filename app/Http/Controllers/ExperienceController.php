<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use App\Models\ActivityExperience;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    public function index(Request $request)
    {
        $query = Experience::query();

        if ($request->has('dateFilter')) {
            $date = $request->input('dateFilter');
            $query->whereDate('available_date', '<=', $date)
                  ->whereDate('expiration_date', '>=', $date);
        }
        $query->orderByDesc('rating');
        $perPage = 15;
        $page = $request->input('page', 1);
        $experiences = $query->paginate($perPage, ['*'], 'page', $page);

        return response()->json($experiences);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'desc' => 'required|string',
            'available_date' => 'required|date',
            'expiration_date' => 'required|date',
            'place' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'price' => 'required|numeric',
            'rating' => 'nullable|numeric',
        ]);
        $experience = Experience::create($validated);
        return response()->json($experience, 201);
    }

    public function show($id)
    {
        $experience = Experience::findOrFail($id);
        $activities = ActivityExperience::where('experience_id', $id)->get();         
        return response()->json([
            'experience' => $experience,
            'activities' => $activities,
        ]);
    }

    public function update(Request $request, $id)
    {
        $experience = Experience::findOrFail($id);
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'desc' => 'sometimes|required|string',
            'available_date' => 'sometimes|required|date',
            'expiration_date' => 'sometimes|required|date',
            'price' => 'sometimes|required|numeric',
            'rating' => 'nullable|numeric',
        ]);
        $experience->update($validated);
        return response()->json($experience);
    }

    public function destroy($id)
    {
        $experience = Experience::findOrFail($id);
        $experience->delete();
        return response()->json(null, 204);
    }
}
