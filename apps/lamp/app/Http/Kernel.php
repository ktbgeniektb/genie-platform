// app/Http/Kernel.php

protected $middleware = [
    // 以下が存在するか？
    \Fruitcake\Cors\HandleCors::class,
];