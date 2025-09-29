<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChangeEvent extends Model
{
    protected $fillable = ['user_id','log_id','theme','type','details'];
    protected $casts = ['details' => 'array'];
    public function log(){ return $this->belongsTo(Log::class); }
    public function user(){ return $this->belongsTo(User::class); }
}
