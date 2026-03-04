<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'document',
        'status',
        'commission',
        'imageUrl',
        'followers_instagram',
        'relevance_score',
        'is_trending'
    ];
}
