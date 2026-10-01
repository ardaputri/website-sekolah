<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contact_reviews', function (Blueprint $table) {
            $table->id();
            $table->string('name');                          // Nama pengulas
            $table->string('email')->nullable();             // Email (opsional)
            $table->unsignedTinyInteger('rating');           // Rating 1-5 bintang
            $table->text('comment');                         // Isi komentar/ulasan
            $table->boolean('is_approved')->default(true);   // Moderasi oleh admin
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_reviews');
    }
};
