<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
     * @var array<int, class-string|string>
     */
    protected $middleware = [
        // ここにCORSを追加する
        \Illuminate\Http\Middleware\HandleCors::class,
    ];

    // 他の $middlewareGroups や $routeMiddleware が続く
}
