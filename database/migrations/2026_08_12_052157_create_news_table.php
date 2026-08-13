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
        Schema::create('news', function (Blueprint $table) {
            $table->id();

            // Informasi utama berita
            $table->string('title');
            $table->string('slug')->unique();

            // Isi berita
            $table->text('excerpt')->nullable();
            $table->longText('content');

            // Gambar utama berita
            $table->string('image')->nullable();

            // Kategori berita
            $table->string('category')->nullable();

            // Status publikasi
            $table->enum('status', [
                'draft',
                'published',
                'scheduled',
            ])->default('draft');

            // Waktu berita dipublikasikan
            $table->timestamp('published_at')->nullable();

            // Jumlah views
            $table->unsignedBigInteger('views')->default(0);

            // Admin yang membuat berita
            $table->foreignId('author_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};