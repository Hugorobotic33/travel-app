<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'desc',
        'available_date',
        'expiration_date',
        'price',
        'rating',
        'status',
        'place',
        'image',
    ];
}
