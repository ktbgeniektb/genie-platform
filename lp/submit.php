<?php
header('Content-Type: application/json');

// デバッグ用
file_put_contents('debug.txt', print_r($_POST, true), FILE_APPEND);

echo json_encode([
  'status' => 'success',
  'message' => 'データ受信OK',
  'data' => $_POST
]);
exit;
