<?php

// app/Http/Controllers/Lamp/LogController.php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LogStoreRequest;
use App\Models\Log;
use Illuminate\Http\Request;
use App\Http\Requests\Lamp\StoreLogRequest;
use App\Http\Requests\Lamp\UpdateLogRequest;

class LogController extends Controller
{
    // GET /api/lamp/logs?limit=10
    public function index(Request $req)
    {
        $limit = min((int)$req->query('limit', 10), 50);
        $logs = Log::where('user_id', $req->user()->id)
            ->latest('id')
            ->paginate($limit);

        return response()->json($logs);
    }

    // POST /api/lamp/logs
    public function store(StoreLogRequest $req)
    {
        $payload = $req->validated();
        $payload['user_id'] = $req->user()->id;

        $log = Log::create($payload);
        return response()->json($log, 201);
    }

    // GET /api/lamp/logs/{id}
    public function show(Request $req, Log $log)
    {
        $this->assertOwner($req, $log);
        return response()->json($log);
    }

        public function update(UpdateLogRequest $req, Log $log)
    {
        $this->assertOwner($req, $log);
        $log->fill($req->validated())->save();
        return response()->json($log);
    }

        public function destroy(Request $req, Log $log)
    {
        $this->assertOwner($req, $log);
        $log->delete();
        return response()->json(['message' => 'deleted']);
    }

    private function assertOwner(Request $req, Log $log): void
    {
        abort_if($log->user_id !== $req->user()->id, 403, 'Forbidden');
    }

}
