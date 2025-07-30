<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DiagnosisResult;

class DiagnosisResultController extends Controller
{
    public function ranking($topType)
    {
        $allCounts = DiagnosisResult::selectRaw("top_type, COUNT(*) as count")
            ->groupBy("top_type")
            ->orderByDesc("count")
            ->get();

        $rank = $allCounts->search(function ($item) use ($topType) {
            return $item->top_type === $topType;
        }) + 1;

        return response()->json([
            'rank' => $rank,
            'total' => $allCounts->count(),
        ]);
    }

}
