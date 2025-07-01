<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DiagnosisResult extends Model
{
    protected $fillable = ['name', 'top_type', 'score'];

    protected $casts = [
        'score' => 'array',
    ];
}