<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('change_events', function (Blueprint $t) {
            $t->id();
            $t->foreignId('user_id')->constrained()->cascadeOnDelete();
            $t->foreignId('log_id')->constrained('logs')->cascadeOnDelete();
            $t->string('theme'); // 例: 共鳴/探求/挑戦/表現/体験
            $t->enum('type', ['NEW_THEME','FREQ_UP','INTENSITY_UP']);
            $t->json('details')->nullable(); // {hits: 3, prev_week:1, this_week:2 など}
            $t->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void { Schema::dropIfExists('change_events'); }

};
