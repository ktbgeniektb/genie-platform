<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StudentUpsertRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $id = $this->route('student')?->id ?? null;

        return [
            // DBで必須の6つ
            'name'            => ['required','string','max:255'],
            'furigana'        => ['required','string','max:255'],
            'email'           => ['required','email','max:255', Rule::unique('students','email')->ignore($id)],
            'phone'           => ['required','string','max:50'],
            'education'       => ['required','string','max:255'],
            'graduation_year' => ['required','integer'],

            // 任意
            'line_id'            => ['nullable','string','max:255'],
            'postal_code'        => ['nullable','string','max:20'],
            'address_prefecture' => ['nullable','string','max:50'],
            'address_line1'      => ['nullable','string','max:255'],
            'application_reason' => ['nullable','string'],

            // 使うなら
            'es_pdf' => ['nullable','file','mimes:pdf','max:10240'],
        ];
    }
}
