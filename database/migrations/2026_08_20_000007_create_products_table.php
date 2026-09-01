<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');                          // Nama produk
            $table->string('slug')->unique();                // Slug untuk URL
            $table->text('description')->nullable();         // Deskripsi lengkap produk
            $table->text('short_description')->nullable();   // Deskripsi singkat
            $table->string('image')->nullable();             // Gambar utama produk
            $table->json('images')->nullable();              // Galeri foto produk [{image, caption}]
            $table->decimal('price', 12, 0)->nullable();     // Harga (nullable jika tidak dijual)
            $table->enum('status', ['available', 'coming_soon', 'sold_out'])->default('available');
            $table->foreignId('product_category_id')->nullable()->constrained('product_categories')->nullOnDelete();
            $table->foreignId('academic_program_id')->nullable()->constrained('academic_programs')->nullOnDelete(); // Kompetensi keahlian pembuat
            $table->string('maker')->nullable();             // Kelas/kompetensi pembuat: "Kelas XII PPLG"
            $table->foreignId('author_id')->nullable()->constrained('users')->nullOnDelete();
            $table->boolean('is_featured')->default(false);  // Produk unggulan
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
