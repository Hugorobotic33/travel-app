<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Experience;
use App\Models\ActivityExperience;
use App\Models\Reservation;
use App\Models\User;

class ModelsTest extends TestCase
{
    use RefreshDatabase;

    public function test_experience_model_fillable()
    {
        $data = [
            'title' => 'Test',
            'desc' => 'Desc',
            'available_date' => '2025-01-01',
            'expiration_date' => '2025-12-31',
            'price' => 100,
            'rating' => 4.5,
            'status' => true,
            'place' => 'Lugar',
            'image' => 'img.jpg',
        ];
        $experience = Experience::create($data);
        $this->assertDatabaseHas('experiences', ['title' => 'Test']);
    }

    public function test_activity_experience_belongs_to_experience()
    {
        $experience = Experience::factory()->create();
        $activity = ActivityExperience::create([
            'experience_id' => $experience->id,
            'desc' => 'Actividad',
            'hour' => '10:00:00',
            'duration_time' => '1 hora',
            'status' => true,
        ]);
        $this->assertEquals($experience->id, $activity->experience->id);
    }

    public function test_reservation_belongs_to_experience()
    {
        $experience = Experience::factory()->create();
        $reservation = Reservation::create([
            'experience_id' => $experience->id,
            'people_amount' => 2,
            'reservation_price' => 200,
            'experience_date' => '2025-06-01',
            'status' => true,
        ]);
        $this->assertEquals($experience->id, $reservation->experience->id);
    }
}
