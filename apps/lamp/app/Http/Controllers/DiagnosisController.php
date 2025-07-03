<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DiagnosisResult;

class DiagnosisController extends Controller
{
    public function store(Request $request)
    {
        //とりあえずバリデーション
        $request->validate([
            'name'=>'nullable|string|max:255',
            'top_type' => 'required|string|max:255',
            'score' => 'required|array'
        ]);
        //
        $diagnosis = DiagnosisResult::create([
            'name' => $request->input('name'),
            'top_type' => $request->input('top_type'),
            'score' => $request->input('score'),
        ]);

        return response()->json(['id' => $diagnosis->id], 201);

    }

}
