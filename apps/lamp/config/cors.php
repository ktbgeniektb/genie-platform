<?php

return [

    'paths'            => ['api/*'],

    'allowed_methods'  => ['*'],

    'allowed_origins' => [
        'http://localhost:5173', // ←ローカルで動作確認時
        'https://ktbgenie.sakura.ne.jp', // ←本番用
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers'  => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
