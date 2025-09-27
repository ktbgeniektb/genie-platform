<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Log extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','industry','text','emotions','detection'];

    protected $casts = [
        'emotions'  => 'array',
        'detection' => 'array',
    ];

    public function user() { return $this->belongsTo(User::class); }
    public function scopeMine($q, $userId){ return $q->where('user_id', $userId); }
}