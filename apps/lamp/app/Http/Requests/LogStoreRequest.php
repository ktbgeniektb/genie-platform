<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LogStoreRequest extends FormRequest {
    public function authorize(): bool { return true; } // 認可はポリシーで別途
    public function rules(): array {
        return [
            'industry' => ['required','string','max:100'],
            'text'     => ['required','string','min:50','max:2000'], // 目安
            'emotions' => ['nullable','array'],
            'emotions.*' => ['string','max:20'],
        ];
    }
}


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    // public function rules(): array
    // {
    //     return [
    //         //
    //     ];
    // }

