<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('organizations', function (Blueprint $table) {
            $table->id();
            $table->string('name');                          // Nama organisasi: "OSIS", "MPK"
            $table->string('slug')->unique();                // Slug untuk URL
            $table->text('description')->nullable();         // Deskripsi organisasi
            $table->string('vision')->nullable();            // Visi organisasi
            $table->text('mission')->nullable();             // Misi organisasi
            $table->json('structure')->nullable();           // Struktur kepengurusan [{name, position, photo}]
            $table->string('image')->nullable();             // Gambar/logo organisasi
            $table->string('period')->nullable();            // Periode kepengurusan: "2026/2027"
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('organizations');
    }
};
