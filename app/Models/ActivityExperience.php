<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityExperience extends Model
{
    use HasFactory;

    protected $fillable = [
        'experience_id',
        'desc',
        'hour',
        'duration_time',
        'status',
    ];

    public function experience()
    {
        return $this->belongsTo(Experience::class);
    }
}
