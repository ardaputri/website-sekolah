<?php

namespace Database\Seeders;

use App\Models\Organization;
use App\Models\Extracurricular;
use Illuminate\Database\Seeder;

class KesiswaanSeeder extends Seeder
{
    public function run(): void
    {
        // ── Organisasi ──
        $organisasi = [
            [
                'name' => 'OSIS',
                'slug' => 'osis',
                'description' => 'Organisasi Siswa Intra Sekolah (OSIS) merupakan wadah aspirasi, pengembangan diri, dan kepemimpinan siswa di lingkungan sekolah. OSIS berperan aktif dalam menyelenggarakan kegiatan sekolah, menampung aspirasi siswa, dan menjadi jembatan antara siswa dengan pihak sekolah.',
                'vision' => 'Menjadi organisasi siswa yang representative, transformatif, dan berdaya guna bagi seluruh siswa SMKN 4 Bogor.',
                'mission' => "1. Menampung dan menyalurkan aspirasi siswa secara bersama.\n2. Menyelenggarakan kegiatan positif yang mendukung pengembangan karakter.\n3. Mempererat kekeluargaan dan semangat gotong royong antar siswa.\n4. Mewakili sekolah dalam kegiatan tingkat kota/provinsi.",
                'period' => '2026/2027',
                'structure' => [
                    ['name' => 'Ahmad Fauzi', 'position' => 'Ketua OSIS'],
                    ['name' => 'Siti Nurhaliza', 'position' => 'Wakil Ketua'],
                    ['name' => 'Budi Santoso', 'position' => 'Sekretaris'],
                    ['name' => 'Rina Wati', 'position' => 'Bendahara'],
                ],
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'MPK',
                'slug' => 'mpk',
                'description' => 'Majelis Perwakilan Kelas (MPK) adalah lembaga legislatif siswa yang bertugas mengawasi kinerja OSIS, menampung aspirasi dari seluruh kelas, dan memastikan hak-hak siswa terpenuhi.',
                'vision' => 'Menjadi lembaga legislatif siswa yang independen, aspiratif, dan akuntabel.',
                'mission' => "1. Mengawasi pelaksanaan program kerja OSIS.\n2. Menampung dan menyalurkan aspirasi seluruh kelas.\n3. Menjadi forum diskusi dan musyawarah antar kelas.\n4. Menjaga transparansi dan akuntabilitas organisasi.",
                'period' => '2026/2027',
                'structure' => [
                    ['name' => 'Dewi Lestari', 'position' => 'Ketua MPK'],
                    ['name' => 'Andi Pratama', 'position' => 'Wakil Ketua'],
                    ['name' => 'Maya Sari', 'position' => 'Sekretaris'],
                ],
                'is_active' => true,
                'sort_order' => 2,
            ],
        ];

        foreach ($organisasi as $data) {
            Organization::updateOrCreate(['slug' => $data['slug']], $data);
        }

        // ── Ekstrakurikuler ──
        $ekskul = [
            [
                'name' => 'PMR',
                'slug' => 'pmr',
                'description' => 'Palang Merah Remaja (PMR) melatih siswa dalam bidang kesehatan, pertolongan pertama, donor darah, dan kepedulian sosial kepada sesama. Siswa belajar menjadi relawan yang siap membantu di saat situasi darurat.',
                'schedule' => 'Sabtu, 14:00 - 16:00 WIB',
                'coach_name' => 'Ibu Siti Aminah, S.Pd',
                'coach_phone' => '081234567890',
                'location' => 'Ruang UKS & Aula',
                'achievements' => [
                    ['title' => 'Juara 1 Lomba PMR Tingkat Kota Bogor', 'year' => '2025', 'event' => 'Hari PMR Nasional'],
                    ['title' => 'Juara 2 Lomba Pertolongan Pertama', 'year' => '2024', 'event' => 'Festival Kesehatan Pelajar'],
                ],
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Pramuka',
                'slug' => 'pramuka',
                'description' => 'Membangun kemandirian, kedisiplinan, dan kepemimpinan melalui kegiatan kepramukaan serta kecintaan terhadap alam. Anggota Pramuka aktif dalam kegiatan perkemahan, bakti masyarakat, dan penjelajahan.',
                'schedule' => 'Sabtu, 07:00 - 10:00 WIB',
                'coach_name' => 'Bapak Hendra Gunawan, S.Pd',
                'coach_phone' => '081234567891',
                'location' => 'Lapangan Utama & Hutan Kota',
                'achievements' => [
                    ['title' => 'Juara Umum Perkemahan Wirakarya', 'year' => '2025', 'event' => 'KWPC Kabupaten Bogor'],
                    ['title' => 'Juara 1 Pioneering', 'year' => '2024', 'event' => 'Jambore Nasional'],
                ],
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Rohis',
                'slug' => 'rohis',
                'description' => 'Kerohanian Islam (Rohis) sebagai wadah pembinaan akhlak, kegiatan keagamaan, dan penguatan nilai spiritual siswa. Kegiatan meliputi kajian Islam, tadarus, dan bakti sosial keagamaan.',
                'schedule' => 'Jumat, 14:00 - 15:30 WIB',
                'coach_name' => 'Bapak Ustadz Ahmad Fauzi',
                'coach_phone' => '081234567892',
                'location' => 'Musholla Al-Hikmah',
                'achievements' => [
                    ['title' => 'Juara 2 MTQ Tingkat Kecamatan', 'year' => '2025', 'event' => 'MTQ Pelajar Bogor'],
                ],
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Paskibra',
                'slug' => 'paskibra',
                'description' => 'Pasukan Pengibar Bendera (Paskibra) melatih kedisiplinan, baris-berbaris, jiwa kepemimpinan, dan rasa nasionalisme. Anggota Paskibra bertugas mengibarkan bendera pada upacara hari besar nasional dan kegiatan sekolah.',
                'schedule' => 'Senin & Rabu, 15:30 - 17:00 WIB',
                'coach_name' => 'Bapak Rudi Hartono',
                'coach_phone' => '081234567893',
                'location' => 'Lapangan Utama',
                'achievements' => [
                    ['title' => 'Juara 1 PBB Tingkat Kota Bogor', 'year' => '2025', 'event' => 'Hari Pendidikan Nasional'],
                    ['title' => 'Terbaik dalam Pengibaran Bendera', 'year' => '2024', 'event' => 'Upacara HUT RI ke-79'],
                ],
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Paduan Suara',
                'slug' => 'paduan-suara',
                'description' => 'Mengembangkan bakat olah vokal dan harmoni musik untuk tampil di berbagai kegiatan sekolah maupun lomba. Paduan Suara menjadi kebanggaan sekolah dalam acara seremonial dan kompetisi antar sekolah.',
                'schedule' => 'Selasa, 15:00 - 17:00 WIB',
                'coach_name' => 'Ibu Rina Marlina, S.Sn',
                'coach_phone' => '081234567894',
                'location' => 'Ruang Musik',
                'achievements' => [
                    ['title' => 'Juara 2 Lomba Paduan Suara Se-Kota Bogor', 'year' => '2025', 'event' => 'Festival Seni Pelajar'],
                ],
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Band Sekolah',
                'slug' => 'band-sekolah',
                'description' => 'Wadah ekspresi musik siswa untuk mengasah kreativitas dan tampil percaya diri di berbagai acara sekolah. Band Sekolah sering tampil di pentas seni, pelepasan siswa, dan acara komunitas.',
                'schedule' => 'Kamis, 15:00 - 17:00 WIB',
                'coach_name' => 'Bapak Dedi Kurniawan',
                'coach_phone' => '081234567895',
                'location' => 'Studio Musik',
                'achievements' => [
                    ['title' => 'Best Performance di Pentas Seni', 'year' => '2025', 'event' => 'Festival Seni SMKN 4 Bogor'],
                ],
                'is_active' => true,
                'sort_order' => 6,
            ],
        ];

        foreach ($ekskul as $data) {
            Extracurricular::updateOrCreate(['slug' => $data['slug']], $data);
        }
    }
}
