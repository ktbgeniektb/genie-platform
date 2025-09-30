<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LampEvent;

class LampEventController extends Controller
{
    public function store(Request $req)
    {
        abort_unless($req->header('X-Lamp-Token') === env('LAMP_SHARED_TOKEN'), 401);

        $data = $req->validate([
            'external_user_ref' => 'required|string',
            'event_type'        => 'required|string',
            'payload'           => 'array',
            'occurred_at'       => 'nullable|date',
        ]);

        $row = LampEvent::create([
            'external_user_ref' => $data['external_user_ref'],
            'event_type'        => $data['event_type'],
            'payload'           => $data['payload'] ?? [],
            'occurred_at'       => $data['occurred_at'] ?? now(),
        ]);

        return response()->json(['id'=>$row->id], 201);
    }
}
