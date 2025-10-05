<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LampEvent;
use App\Models\Student;

class LampEventController extends Controller
{
    public function store(Request $req)
    {
        abort_unless($req->header('X-Lamp-Token') === env('LAMP_SHARED_TOKEN'), 401);

        // ✅ まず validate して $data を作る
        $data = $req->validate([
            'external_user_ref' => 'required|string',
            'event_type'        => 'required|string',
            'payload'           => 'array',
            'occurred_at'       => 'nullable|date',
        ]);

        // ✅ ここで初めて $data を使って Student を検索
        $student = Student::where('email', $data['external_user_ref'])->first();

        // ✅ LampEvent を作成
        $row = LampEvent::create([
            'external_user_ref' => $data['external_user_ref'],
            'student_id'        => $student?->id, // ← 学生がいれば紐付け
            'event_type'        => $data['event_type'],
            'payload'           => $data['payload'] ?? [],
            'occurred_at'       => $data['occurred_at'] ?? now(),
        ]);

        return response()->json(['id' => $row->id], 201);
    }
}
