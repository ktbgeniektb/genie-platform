<?php

// app/Services/AtlasWebhook.php
namespace App\Services;
use Illuminate\Support\Facades\Http;

class AtlasWebhook {
  public static function push(string $eventType, string $userRef, array $payload): void {
    $url = env('ATLAS_WEBHOOK_URL');           // 例: https://atlas.example.com/api/lamp-events
    $tok = env('LAMP_SHARED_TOKEN');           // Atlasと同じ値
    if(!$url || !$tok) return;
    Http::withHeaders(['X-Lamp-Token'=>$tok])
      ->post($url, [
        'external_user_ref'=>$userRef,
        'event_type'=>$eventType,
        'payload'=>$payload,
      ])->throw();
  }
}
