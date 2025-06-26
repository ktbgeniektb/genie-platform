<?php
$jsonPath = __DIR__ . '/../../lp/entries.json';

if (!file_exists($jsonPath)) {
  echo "<h2>❌ entries.json が見つかりません</h2>";
  exit;
}

$data = json_decode(file_get_contents($jsonPath), true);

// 整形エラーチェック
if (!is_array($data)) {
  echo "<h2>⚠️ entries.json の形式が不正です</h2>";
  exit;
}

?>

<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>エントリー一覧（Genie）</title>
  <style>
    body {
      font-family: sans-serif;
      padding: 2rem;
      background: #f8f9fa;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      background: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    th, td {
      border: 1px solid #ddd;
      padding: 10px;
      text-align: left;
    }
    th {
      background-color: #4F46E5;
      color: white;
    }
    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    h1 {
      color: #333;
    }
  </style>
</head>
<body>
  <h1>Genieエントリー一覧</h1>
  <table>
    <thead>
      <tr>
        <th>名前</th>
        <th>topType</th>
      </tr>
    </thead>
    <tbody>
      <?php foreach ($data as $entry): ?>
        <tr>
          <td><?= htmlspecialchars($entry['name'] ?? '未入力') ?></td>
          <td><?= htmlspecialchars($entry['topType'] ?? '---') ?></td>
        </tr>
      <?php endforeach; ?>
    </tbody>
  </table>
</body>
</html>
