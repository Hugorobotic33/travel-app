<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'experience_id',
        'people_amount',
        'reservation_price',
        'experience_date',
        'status',
        'user_id',
    ];

    public function experience()
    {
        return $this->belongsTo(Experience::class);
    }
}
