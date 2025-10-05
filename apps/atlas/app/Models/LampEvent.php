<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LampEvent extends Model
{
    protected $fillable = [
        'external_user_ref',
        'event_type',
        'payload',
        'occurred_at',
    ];

    protected $casts = [
        'payload' => 'array',
        'occurred_at' => 'datetime',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
