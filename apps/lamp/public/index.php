<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// 💡 Laravelのベースパスを自動判定
$basePath = realpath(__DIR__ . '/../');

// ローカル用パスにvendorがなければ → apps/lamp/に切り替える（本番用）
if (!file_exists($basePath . '/vendor/autoload.php')) {
    $basePath = realpath(__DIR__ . '/../apps/lamp');
}

// Register the Composer autoloader...
require $basePath . '/vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once $basePath . '/bootstrap/app.php';

$app->handleRequest(Request::capture());
