<?php

// app/Http/Controllers/Lamp/LogController.php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LogStoreRequest;
use App\Models\Log;
use Illuminate\Http\Request;
use App\Http\Requests\StoreLogRequest;
use App\Http\Requests\UpdateLogRequest;
use App\Services\AtlasWebhook;

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
        // 入力を検証して user_id を追加
        $payload = $req->validated();
        $payload['user_id'] = $req->user()->id;

        // ログ保存
        $log = Log::create($payload);

        // 変化検出
        $detector = app(\App\Services\ChangeDetector::class);
        $events   = $detector->detectAndStore($req->user()->id, $log);

        // NEW_THEME だけ Atlas に通知
        foreach ($events as $event) {
            if ($event['type'] === 'NEW_THEME') {
                \App\Services\AtlasWebhook::push(
                    'NEW_THEME',
                    $req->user()->email, // ← これ！
                    [
                        'theme'   => $event['theme'],
                        'details' => $event['details'],
                        'log_id'  => $log->id,
                        'content' => $log->text,
                    ]
                );
            }
        }

        // レスポンスにログとイベント一覧を返す
        return response()->json([
            'log'    => $log,
            'events' => $events,
        ], 201);
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
