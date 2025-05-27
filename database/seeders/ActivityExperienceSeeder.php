<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Experience;
use App\Models\ActivityExperience;

class ActivityExperienceSeeder extends Seeder
{
    public function run(): void
    {
        $experiences = Experience::all();
        foreach ($experiences as $experience) {
            ActivityExperience::create([
                'experience_id' => $experience->id,
                'desc' => 'Bienvenida y explicación general de la experiencia.',
                'hour' => '09:00:00',
                'duration_time' => '30 minutos',
                'status' => true,
            ]);
            ActivityExperience::create([
                'experience_id' => $experience->id,
                'desc' => 'Actividad principal de la experiencia.',
                'hour' => '10:00:00',
                'duration_time' => '2 horas',
                'status' => true,
            ]);
            ActivityExperience::create([
                'experience_id' => $experience->id,
                'desc' => 'Cierre y despedida.',
                'hour' => '12:30:00',
                'duration_time' => '15 minutos',
                'status' => true,
            ]);
        }
    }
}
