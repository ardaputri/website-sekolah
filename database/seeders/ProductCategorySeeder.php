<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Proyek Siswa', 'description' => 'Hasil proyek dan karya siswa dari kegiatan belajar mengajar.', 'sort_order' => 1],
            ['name' => 'Merchandise', 'description' => 'Produk merchandise sekolah seperti kaos, pin, stiker, dll.', 'sort_order' => 2],
            ['name' => 'Unit Usaha', 'description' => 'Produk dari unit produksi/bengkel sekolah.', 'sort_order' => 3],
            ['name' => 'Produk Digital', 'description' => 'Aplikasi, website, dan produk digital lainnya.', 'sort_order' => 4],
            ['name' => 'Brosur & Informasi', 'description' => 'Brosur PPDB, profil sekolah, dan materi informasi.', 'sort_order' => 5],
        ];

        foreach ($categories as $data) {
            ProductCategory::updateOrCreate(
                ['slug' => Str::slug($data['name'])],
                array_merge($data, ['is_active' => true])
            );
        }
    }
}
