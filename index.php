<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// ① Laravel のオートロード（apps/lamp 以下を指すように）
require __DIR__.'/apps/lamp/vendor/autoload.php';

// ② Laravel を Bootstrap（apps/lamp 以下を指すように）
$app = require_once __DIR__.'/apps/lamp/bootstrap/app.php';

// ③ リクエストを Laravel で処理し、レスポンスを出力
$response = $app->handle(\Illuminate\Http\Request::capture());
$response->send();