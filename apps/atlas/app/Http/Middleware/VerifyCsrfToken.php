<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * この配列のURIはCSRFトークン検証から除外されます。
     *
     * @var array<int, string>
     */
    protected $except = [
        // 'api/*', ← ここは絶対に空のままにしておいてください！
    ];
}
