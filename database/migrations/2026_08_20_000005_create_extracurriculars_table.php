<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('extracurriculars', function (Blueprint $table) {
            $table->id();
            $table->string('name');                          // Nama ekskul: "Pramuka", "PMR", "Paskibra"
            $table->string('slug')->unique();                // Slug untuk URL
            $table->text('description')->nullable();         // Deskripsi unik per ekskul
            $table->string('schedule')->nullable();          // Jadwal latihan: "Sabtu, 14:00-16:00"
            $table->string('coach_name')->nullable();        // Nama pembina
            $table->string('coach_phone')->nullable();       // Nomor pembina
            $table->string('location')->nullable();          // Tempat latihan
            $table->string('image')->nullable();             // Gambar kegiatan
            $table->json('achievements')->nullable();        // Prestasi terkait [{title, year, event}]
            $table->json('gallery')->nullable();             // Galeri kegiatan [{image, caption}]
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('extracurriculars');
    }
};
