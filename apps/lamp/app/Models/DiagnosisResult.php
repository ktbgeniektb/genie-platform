<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DiagnosisResult extends Model
{
    // 💡 どのカラムを保存可能にするか（セキュリティ対策）
    protected $fillable = ['name', 'top_type', 'score'];

    // 💡 score はJSONとして保存するので、配列で扱えるようにする
    protected $casts = [
        'score' => 'array',
    ];
}