<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\AcademicProgram;
use App\Models\User;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $categories = ProductCategory::all()->keyBy('name');
        $programs = AcademicProgram::all()->keyBy('short_code');
        $admin = User::first();

        $products = [
            [
                'name' => 'Website Portfolio Siswa',
                'description' => 'Website portofolio personal yang dirancang dan dikembangkan oleh siswa PPLG sebagai wujud kreativitas dan penerapan teknologi web modern. Website ini dilengkapi dengan fitur responsif, animasi modern, dan sistem manajemen konten yang mudah digunakan.',
                'short_description' => 'Website portofolio personal responsif dengan animasi modern.',
                'category' => 'Proyek Siswa',
                'program' => 'PPLG',
                'maker' => 'Kelas XII PPLG',
                'price' => null,
                'status' => 'available',
                'image' => '/images/produk-1.jpg',
            ],
            [
                'name' => 'Aplikasi Manajemen Inventaris',
                'description' => 'Aplikasi berbasis web untuk manajemen inventaris sekolah yang memudahkan pengelolaan data barang, pelacakan stok, dan pelaporan secara real-time. Dibangun menggunakan framework modern dengan antarmuka yang intuitif.',
                'short_description' => 'Aplikasi web manajemen inventaris sekolah real-time.',
                'category' => 'Produk Digital',
                'program' => 'PPLG',
                'maker' => 'Kelas XI PPLG',
                'price' => null,
                'status' => 'available',
                'image' => '/images/produk-2.jpg',
            ],
            [
                'name' => 'Miniatur Jaringan Komputer',
                'description' => 'Model skala kecil infrastruktur jaringan komputer yang menampilkan topologi jaringan, perangkat aktif (router, switch, access point), dan kabelisasi struktural. Cocok untuk pembelajaran dan presentasi.',
                'short_description' => 'Model skala kecil infrastruktur jaringan komputer.',
                'category' => 'Proyek Siswa',
                'program' => 'TJKT',
                'maker' => 'Kelas XII TJKT',
                'price' => 150000,
                'status' => 'available',
                'image' => '/images/produk-3.jpg',
            ],
            [
                'name' => 'Sistem Informasi Akademik',
                'description' => 'Platform digital pengelolaan data akademik siswa termasuk nilai, jadwal, dan absensi dengan antarmuka yang mudah digunakan. Dilengkapi fitur cetak rapor otomatis.',
                'short_description' => 'Platform pengelolaan data akademik siswa.',
                'category' => 'Produk Digital',
                'program' => 'PPLG',
                'maker' => 'Kelas XI PPLG',
                'price' => null,
                'status' => 'available',
                'image' => '/images/produk-4.jpg',
            ],
            [
                'name' => 'Service Kit Otomotif Custom',
                'description' => 'Peralatan servis kendaraan yang dirancang dan dirakit oleh siswa Teknik Otomotif untuk keperluan bengkel produksi sekolah. Kualitas setara standar bengkel profesional.',
                'short_description' => 'Peralatan servis kendaraan custom buatan siswa.',
                'category' => 'Proyek Siswa',
                'program' => 'TO',
                'maker' => 'Kelas XII TO',
                'price' => 250000,
                'status' => 'coming_soon',
                'image' => '/images/produk-5.jpg',
            ],
            [
                'name' => 'Mobile App E-Library',
                'description' => 'Aplikasi mobile perpustakaan digital yang memungkinkan siswa meminjam dan membaca buku secara online. Tersedia fitur pencarian, bookmark, dan notifikasi pengembalian.',
                'short_description' => 'Aplikasi mobile perpustakaan digital.',
                'category' => 'Produk Digital',
                'program' => 'PPLG',
                'maker' => 'Kelas X PPLG',
                'price' => null,
                'status' => 'available',
                'image' => '/images/produk-6.jpg',
            ],
            [
                'name' => 'Rak Server Mini',
                'description' => 'Rak server mini hasil fabrikasi siswa Teknik Pengelasan, dirancang untuk kebutuhan laboratorium jaringan. Kuat, rapi, dan sesuai standar industri.',
                'short_description' => 'Rak server mini hasil fabrikasi siswa.',
                'category' => 'Proyek Siswa',
                'program' => 'TP',
                'maker' => 'Kelas XII TP',
                'price' => 350000,
                'status' => 'available',
                'image' => '/images/produk-7.jpg',
            ],
            [
                'name' => 'Dashboard Monitoring Jaringan',
                'description' => 'Panel kontrol berbasis web untuk memonitor status dan kesehatan jaringan komputer secara real-time. Dilengkapi alert otomatis jika terjadi gangguan.',
                'short_description' => 'Panel kontrol monitoring jaringan real-time.',
                'category' => 'Produk Digital',
                'program' => 'TJKT',
                'maker' => 'Kelas XII TJKT',
                'price' => null,
                'status' => 'available',
                'image' => '/images/produk-8.jpg',
            ],
            [
                'name' => 'Karya Las Ornament Dekoratif',
                'description' => 'Produk kerajinan logam las dekoratif berupa railing, teralis, dan ornamen yang dihasilkan dari bengkel produksi sekolah. Kualitas artistik dan tahan lama.',
                'short_description' => 'Kerajinan logam las dekoratif berkualitas tinggi.',
                'category' => 'Proyek Siswa',
                'program' => 'TP',
                'maker' => 'Kelas XII TP',
                'price' => 500000,
                'status' => 'available',
                'image' => '/images/produk-9.jpg',
            ],
        ];

        foreach ($products as $i => $item) {
            $category = $categories[$item['category']] ?? null;
            $program = $programs[$item['program']] ?? null;

            Product::updateOrCreate(
                ['name' => $item['name']],
                [
                    'slug' => Str::slug($item['name']),
                    'description' => $item['description'],
                    'short_description' => $item['short_description'],
                    'image' => str_replace('/images/', '', $item['image']),
                    'price' => $item['price'],
                    'status' => $item['status'],
                    'product_category_id' => $category?->id,
                    'academic_program_id' => $program?->id,
                    'maker' => $item['maker'],
                    'author_id' => $admin?->id,
                    'is_active' => true,
                    'is_featured' => $i < 3,
                    'sort_order' => $i,
                ]
            );
        }

        $this->command->info('Produk seeder: ' . count($products) . ' produk berhasil di-seed.');
    }
}
