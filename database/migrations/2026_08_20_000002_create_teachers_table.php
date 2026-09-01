<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->string('name');                          // Nama guru
            $table->string('nip')->nullable();               // Nomor Induk Pegawai
            $table->string('position')->nullable();          // Jabatan (Guru Mata Pelajaran, Wali Kelas, dll)
            $table->string('subject')->nullable();           // Mata pelajaran yang diampu
            $table->foreignId('academic_program_id')->nullable()->constrained('academic_programs')->nullOnDelete(); // Kompetensi keahlian terkait
            $table->string('phone')->nullable();             // Nomor telepon
            $table->string('email')->nullable();             // Email
            $table->string('photo')->nullable();             // Foto guru
            $table->text('bio')->nullable();                 // Bio singkat
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};
