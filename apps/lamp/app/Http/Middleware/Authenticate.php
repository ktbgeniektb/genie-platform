<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * 未認証時はリダイレクトせず401を返す
     */
    protected function redirectTo($request)
    {
        // 何も返さない（nullもreturnしない）
        // Laravelが自動で401 Unauthorizedを返す
    }
}
