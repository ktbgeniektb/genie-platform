<?php
header('Content-Type: application/json');

// JSONとして保存
$entry = $_POST;

$filename = 'entries.json';
$existing = [];

if (file_exists($filename)) {
  $existing = json_decode(file_get_contents($filename), true) ?? [];
}

$existing[] = $entry;
file_put_contents($filename, json_encode($existing, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

// クライアントに返すレスポンス
echo json_encode([
  'status' => 'success',
  'message' => '保存完了',
  'data' => $entry
]);
exit;
