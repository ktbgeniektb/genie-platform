<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DiagnosisResult;
use App\Services\AtlasWebhook;

class DiagnosisController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name'      => 'nullable|string|max:255',
            'top_type'  => 'required|string|max:255',
            'score'     => 'required|array',
        ]);

        $diagnosis = DiagnosisResult::create([
            'name'     => $request->input('name'),
            'top_type' => $request->input('top_type'),
            'score'    => $request->input('score'),
        ]);

        // ★ Atlas にWebhook送信
        AtlasWebhook::push(
            'DIAGNOSIS_SAVED',
            $diagnosis->name ?? 'anonymous',
            [
                'top_type' => $diagnosis->top_type,
                'score'    => $diagnosis->score,
            ]
        );

        return response()->json(['id' => $diagnosis->id], 201);
    }

    public function show($id)
    {
        $result = DiagnosisResult::findOrFail($id);
        return response()->json($result);
    }
}
