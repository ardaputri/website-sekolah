<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('academics', function (Blueprint $table) {
            // Menambahkan kolom time karena tidak ada di tabel utama
            $table->string('time')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('academics', function (Blueprint $table) {
            // Menghapus kolom time jika rollback
            $table->dropColumn('time');
        });
    }
};