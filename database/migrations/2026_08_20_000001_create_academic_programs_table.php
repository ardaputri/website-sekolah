<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('academic_programs', function (Blueprint $table) {
            $table->id();
            $table->string('name');                          // Nama lengkap: "Pengembangan Perangkat Lunak dan Gim"
            $table->string('short_code')->unique();          // Kode singkat: "PPLG"
            $table->text('description')->nullable();         // Deskripsi program
            $table->text('curriculum')->nullable();          // Profil kurikulum
            $table->json('subjects')->nullable();            // Daftar mata pelajaran utama
            $table->json('career_prospects')->nullable();    // Prospek karier lulusan
            $table->json('facilities')->nullable();          // Sarana & prasarana
            $table->json('certifications')->nullable();      // Sertifikasi kompetensi
            $table->string('image')->nullable();             // Gambar/icon program
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('academic_programs');
    }
};
