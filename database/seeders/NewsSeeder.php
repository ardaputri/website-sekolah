<?php

namespace Database\Seeders;

use App\Models\News;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class NewsSeeder extends Seeder
{
    /**
     * Berita contoh untuk halaman Berita.
     *
     * Gambar memakai file statis di public/images (path diawali '/images/'),
     * jadi tidak bergantung pada volume storage Railway.
     *
     * Slug dibentuk dari judul dan dipakai sebagai kunci updateOrCreate,
     * sehingga seeder aman dijalankan berulang kali tanpa menduplikasi data.
     */
    public function run(): void
    {
        $authorId = User::query()->orderBy('id')->value('id');

        $berita = [
            [
                'title' => 'Siswa SMKN 4 Bogor Raih Juara 2 Technoupdate X HIMPACT 2025',
                'category' => 'Prestasi',
                'image' => '/images/berita-technoupdate.jpg',
                'excerpt' => 'Tim siswa berhasil menyabet Juara 2 pada ajang Technoupdate X HIMPACT 2025.',
                'content' => 'Kabar membanggakan datang dari tim siswa SMKN 4 Bogor yang berhasil meraih Juara 2 pada ajang Technoupdate X HIMPACT 2025. Kompetisi ini diikuti oleh puluhan sekolah dari berbagai daerah dan menguji kemampuan peserta dalam memecahkan masalah nyata menggunakan teknologi.',
            ],
            [
                'title' => 'Juara 1 UI/UX Design LP3i Depok 2025',
                'category' => 'Prestasi',
                'image' => '/images/berita-uiux-lp3i.jpg',
                'excerpt' => 'Siswa jurusan PPLG berhasil meraih Juara 1 lomba desain UI/UX tingkat nasional.',
                'content' => 'Siswa jurusan Pengembangan Perangkat Lunak dan Gim (PPLG) kembali mengukir prestasi dengan meraih Juara 1 pada lomba UI/UX Design LP3i Depok 2025. Karya yang diusung mengangkat tema kemudahan akses layanan sekolah bagi siswa dan orang tua.',
            ],
            [
                'title' => 'Juara Umum LKS Tingkat Kota Bogor',
                'category' => 'Prestasi',
                'image' => '/images/berita-lks.jpg',
                'excerpt' => 'Kontingen SMKN 4 Bogor membawa pulang gelar juara umum pada Lomba Kompetensi Siswa.',
                'content' => 'Kontingen SMKN 4 Bogor berhasil meraih gelar juara umum pada Lomba Kompetensi Siswa (LKS) tingkat Kota Bogor. Prestasi ini merupakan hasil pembinaan berkelanjutan di seluruh kompetensi keahlian, mulai dari PPLG, TJKT, Teknik Otomotif, hingga Teknik Pengelasan.',
            ],
            [
                'title' => 'MPLS 2026: Masa Pengenalan Lingkungan Sekolah',
                'category' => 'Kegiatan',
                'image' => '/images/berita-mpls.jpg',
                'excerpt' => 'Kegiatan MPLS 2026 berlangsung meriah dan penuh semangat bagi siswa baru.',
                'content' => 'Masa Pengenalan Lingkungan Sekolah (MPLS) 2026 berlangsung meriah. Siswa baru dikenalkan dengan budaya sekolah, tata tertib, fasilitas praktik, serta organisasi dan ekstrakurikuler yang tersedia di SMKN 4 Bogor.',
            ],
            [
                'title' => 'Peringatan Hari Lahir Pancasila',
                'category' => 'Kegiatan',
                'image' => '/images/berita-pancasila.jpg',
                'excerpt' => 'Upacara peringatan Hari Lahir Pancasila digelar di lapangan utama sekolah.',
                'content' => 'Seluruh siswa, guru, dan tenaga kependidikan mengikuti upacara peringatan Hari Lahir Pancasila di lapangan utama sekolah. Kegiatan ini menjadi momen penguatan nilai-nilai kebangsaan dan karakter pelajar Pancasila.',
            ],
            [
                'title' => 'Peringatan Idul Adha 1447 H di SMKN 4 Bogor',
                'category' => 'Kegiatan',
                'image' => '/images/berita-qurban.jpg',
                'excerpt' => 'Sekolah menyelenggarakan penyembelihan hewan kurban dan berbagi kepada warga sekitar.',
                'content' => 'Dalam rangka memperingati Idul Adha 1447 H, SMKN 4 Bogor menyelenggarakan kegiatan kurban yang melibatkan guru, siswa, dan komite sekolah. Daging kurban dibagikan kepada warga sekitar sekolah sebagai wujud kepedulian sosial.',
            ],
            [
                'title' => 'Aksi Bersih-Bersih Lingkungan Sekolah',
                'category' => 'Kegiatan',
                'image' => '/images/berita-bersih.jpg',
                'excerpt' => 'Siswa dan guru bergotong royong membersihkan lingkungan sekolah.',
                'content' => 'Siswa bersama guru dan tenaga kependidikan melaksanakan aksi bersih-bersih lingkungan sekolah. Kegiatan ini bertujuan menumbuhkan budaya peduli kebersihan dan menciptakan lingkungan belajar yang nyaman.',
            ],
            [
                'title' => 'Peringatan Hari Sumpah Pemuda',
                'category' => 'Kegiatan',
                'image' => '/images/berita-saga.jpg',
                'excerpt' => 'Semangat persatuan digaungkan dalam peringatan Hari Sumpah Pemuda.',
                'content' => 'Peringatan Hari Sumpah Pemuda di SMKN 4 Bogor diisi dengan upacara, penampilan seni budaya, dan lomba antar kelas. Kegiatan ini meneguhkan semangat persatuan dan cinta tanah air di kalangan siswa.',
            ],
            [
                'title' => 'Penghargaan untuk Siswa Berprestasi',
                'category' => 'Prestasi',
                'image' => '/images/berita-penghargaan.jpg',
                'excerpt' => 'Sekolah memberikan penghargaan kepada siswa berprestasi tingkat kota dan provinsi.',
                'content' => 'Sebagai bentuk apresiasi, SMKN 4 Bogor memberikan penghargaan kepada siswa yang berprestasi di tingkat kota dan provinsi. Penghargaan diserahkan langsung oleh kepala sekolah pada upacara bendera.',
            ],
            [
                'title' => 'Pelatihan Literasi Digital untuk Guru',
                'category' => 'Kegiatan',
                'image' => '/images/berita-guru-digital.jpg',
                'excerpt' => 'Guru mengikuti pelatihan literasi digital untuk mendukung pembelajaran berbasis teknologi.',
                'content' => 'Guru SMKN 4 Bogor mengikuti pelatihan literasi digital yang membahas pemanfaatan aplikasi pembelajaran, pengelolaan kelas daring, dan etika digital. Pelatihan ini memperkuat pembelajaran berbasis teknologi di sekolah.',
            ],
            [
                'title' => 'Pengumuman: Jadwal Penerimaan Peserta Didik Baru 2027',
                'category' => 'Pengumuman',
                'image' => '/images/berita-satyalencana.jpg',
                'excerpt' => 'Informasi resmi jadwal dan tata cara pendaftaran peserta didik baru tahun 2027.',
                'content' => 'Diberitahukan kepada calon peserta didik baru bahwa pendaftaran tahun ajaran 2027 akan dibuka sesuai jadwal resmi. Informasi lengkap mengenai persyaratan, jalur pendaftaran, dan jadwal seleksi dapat dilihat pada halaman pengumuman sekolah.',
            ],
        ];

        $total = count($berita);

        foreach ($berita as $i => $item) {
            News::updateOrCreate(
                ['slug' => Str::slug($item['title'])],
                [
                    'title' => $item['title'],
                    'excerpt' => $item['excerpt'],
                    'content' => $item['content'],
                    'image' => $item['image'],
                    'category' => $item['category'],
                    // Nilai enum di database huruf kecil: draft|published|scheduled.
                    'status' => 'published',
                    // Berita terbaru lebih dulu pada urutan `latest()`.
                    'published_at' => now()->subDays($total - $i),
                    'author_id' => $authorId,
                ]
            );
        }

        $this->command?->info('News seeder: ' . $total . ' berita berhasil di-seed.');
    }
}
