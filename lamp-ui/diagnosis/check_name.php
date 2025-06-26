<?php
header('Content-Type: application/json');

// GETとPOSTの両方に対応
$name = $_POST['name'] ?? $_GET['name'] ?? '';
$topType = $_POST['topType'] ?? $_GET['topType'] ?? '';

if (!$name) {
  echo json_encode(['status' => 'error', 'message' => 'name が未指定です']);
  exit;
}

$jsonPath = __DIR__ . '/../../lp/entries.json';

if (!file_exists($jsonPath)) {
  echo json_encode(['status' => 'error', 'message' => 'entries.json が存在しません']);
  exit;
}

$data = json_decode(file_get_contents($jsonPath), true);

// 正常な配列でない場合の対応
if (!is_array($data)) {
  echo json_encode(['status' => 'error', 'message' => 'entries.json の形式が不正です']);
  exit;
}

$updated = false;
foreach ($data as &$entry) {
  if (is_array($entry) && isset($entry['name']) && $entry['name'] === $name) {
    $entry['topType'] = $topType;
    $updated = true;
    break;
  }
}

if ($updated) {
  file_put_contents($jsonPath, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
  echo json_encode(['status' => 'success', 'message' => 'topType を追記しました']);
} else {
  echo json_encode(['status' => 'not_found', 'message' => '該当する名前が見つかりませんでした']);
}
