<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('lamp_events', function (Blueprint $table) {
            $table->foreignId('student_id')
                  ->nullable()
                  ->constrained()
                  ->onDelete('cascade')
                  ->after('id'); // 任意：idの後に追加
        });
    }

    public function down(): void
    {
        Schema::table('lamp_events', function (Blueprint $table) {
            $table->dropForeign(['student_id']);
            $table->dropColumn('student_id');
        });
    }
};
