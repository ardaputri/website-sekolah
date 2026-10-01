<?php

namespace Database\Seeders;

use App\Models\ContactReview;
use Illuminate\Database\Seeder;

class ContactReviewSeeder extends Seeder
{
    /**
     * Ulasan contoh untuk halaman Kontak (rating & komentar).
     */
    public function run(): void
    {
        $reviews = [
            ['name' => 'Rina Marlina', 'email' => 'rina@example.com', 'rating' => 5, 'comment' => 'Sekolah dengan fasilitas lengkap dan guru yang sangat mendukung. Anak saya betah belajar di sini.'],
            ['name' => 'Dedi Supriadi', 'email' => 'dedi@example.com', 'rating' => 5, 'comment' => 'Program keahlian PPLG sangat bagus, lulusannya banyak yang langsung kerja. Terima kasih SMKN 4 Bogor!'],
            ['name' => 'Siti Nurhaliza', 'email' => null, 'rating' => 4, 'comment' => 'Kegiatan ekstrakurikuler beragam dan seru. Administrasi agak lambat tapi overall puas.'],
            ['name' => 'Ahmad Fauzi', 'email' => 'ahmad@example.com', 'rating' => 4, 'comment' => 'Pengajar kompeten dan suasana belajar nyaman. Semoga fasilitas komputer terus diperbarui.'],
            ['name' => 'Budi Santoso', 'email' => null, 'rating' => 5, 'comment' => 'Sekolah vocasional terbaik di Bogor! Praktikum banyak dan relevan dengan dunia industri.'],
            ['name' => 'Maya Sari', 'email' => 'maya@example.com', 'rating' => 3, 'comment' => 'Secara akademik bagus, tapi parkiran masih sempat. Semoga bisa diperbaiki.'],
        ];

        foreach ($reviews as $review) {
            ContactReview::updateOrCreate(
                ['name' => $review['name'], 'comment' => $review['comment']],
                $review
            );
        }
    }
}
