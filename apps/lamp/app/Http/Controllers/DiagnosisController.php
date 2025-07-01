<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DiagnosisResult;

class DiagnosisController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'top_type' => 'required|string|max:255',
            'score' => 'required|array',
        ]);

        DiagnosisResult::create([
            'name' => $validated['name'],
            'top_type' => $validated['top_type'],
            'score' => json_encode($validated['score']),
        ]);

        return response()->json(['message' => '診断結果を保存しました'], 201);
    }
    
    public function index()
    {
        return response()->json(DiagnosisResult::latest()->get());
    }
}
