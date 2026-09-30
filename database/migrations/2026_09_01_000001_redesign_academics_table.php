<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;



return new class extends Migration
{
    public function up(): void
    {
        // Drop old table and recreate with new schema
        Schema::dropIfExists('academics');

        Schema::create('academics', function (Blueprint $table) {
            $table->id();
            $table->string('kelas');           // X, XI, XII
            $table->string('jurusan');         // PPLG, TJKT, TO, TP
            $table->string('rombel');          // PPLG 1, TJKT 2, dll
            $table->string('hari');            // senin, selasa, rabu, kamis, jumat
            $table->string('mata_pelajaran');  // Nama mata pelajaran
            $table->string('jam_mulai');       // 07:00
            $table->string('jam_selesai');     // 09:00
            $table->string('guru')->nullable();        // Nama guru pengajar
            $table->string('ruang')->nullable(); 
            $table->timestamps();
            
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('academics');

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
};
