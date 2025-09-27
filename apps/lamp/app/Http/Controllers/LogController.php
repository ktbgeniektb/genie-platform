<?php

// app/Http/Controllers/Lamp/LogController.php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LogStoreRequest;
use App\Models\Log;
use Illuminate\Http\Request;

class LogController extends Controller
{
    // GET /api/lamp/logs?limit=10
    public function index(Request $req)
    {
        $limit = min((int)$req->query('limit', 10), 50);
        $logs = Log::where('user_id', $req->user()->id)
            ->latest()->paginate($limit);
        return response()->json($logs);
    }

    // POST /api/lamp/logs
    public function store(LogStoreRequest $req)
    {
        $log = Log::create([
            'user_id' => $req->user()->id,
            'industry'=> $req->input('industry'),
            'text'    => $req->input('text'),
            'emotions'=> $req->input('emotions', []),
            // 将来：変化検出はここで計算して detection に入れる
            // 'detection' => $this->detectChange($req->user()->id, $req->input('text')),
        ]);
        return response()->json($log, 201);
    }

    // GET /api/lamp/logs/{id}
    public function show(Log $log)
    {
        $this->authorize('view', $log);
        return response()->json($log);
    }
}
