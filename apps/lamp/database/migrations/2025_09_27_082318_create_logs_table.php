<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('industry', 100);        // 業種
            $table->text('text');                   // 感想本文
            $table->json('emotions')->nullable();   // 感情タグ配列
            // 将来の拡張用（穴あき）
            $table->json('detection')->nullable();  // 変化検出の結果
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('logs'); }
};
