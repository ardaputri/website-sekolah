<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
{
    Schema::create('academics', function (Blueprint $table) {
        $table->id();
        $table->string('kelas');
        $table->string('jurusan');
        $table->string('rombel');
        $table->string('waktu');
        $table->string('senin')->nullable();
        $table->string('selasa')->nullable();
        $table->string('rabu')->nullable();
        $table->string('kamis')->nullable();
        $table->string('jumat')->nullable();
        $table->timestamps();
    });
}

    public function down(): void
    {
        Schema::table('academics', function (Blueprint $table) {
            $table->dropColumn(['kelas', 'jurusan', 'rombel', 'waktu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat']);
        });
    }
};