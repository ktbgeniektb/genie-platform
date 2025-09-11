<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'name','furigana','email','phone','line_id',
        'postal_code','address_prefecture','address_line1',
        'education','graduation_year','application_reason',
        'es_pdf_path',
    ];

    protected $appends = ['es_pdf_url'];

    protected $casts = [
        'graduation_year' => 'integer',
    ];

    public function getEsPdfUrlAttribute(): ?string
    {
        if (!$this->es_pdf_path) return null;
        return Storage::disk('public')->url($this->es_pdf_path);
    }
}
