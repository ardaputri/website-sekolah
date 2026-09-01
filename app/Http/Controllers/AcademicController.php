<?php

namespace App\Http\Controllers;

use App\Models\Academic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AcademicController extends Controller
{
    public function index()
    {
        // Mengambil seluruh data jadwal dari database
        $academics = Academic::all();

        // Mengirimkan data $academics ke tampilan public user (Akademik.jsx)
        return Inertia::render('Akademik', [
            'academics' => $academics
        ]);
    }

    /**
     * Halaman Detail Kompetensi Keahlian.
     * Saat ini menggunakan data statis; akan diganti dari DB saat CRUD Academic Programs.
     */
    public function show($kode)
    {
        // Data statis sementara — nanti diganti dengan AcademicProgram::where('short_code', $kode)->firstOrFail()
        $programs = collect([
            'PPLG' => [
                'shortCode' => 'PPLG',
                'name' => 'Pengembangan Perangkat Lunak dan Gim',
                'image' => '/images/akademik-pplg.jpg',
                'desc' => 'Program keahlian yang membekali siswa dengan keterampilan komprehensif dalam pengembangan perangkat lunak, mulai dari perencanaan, desain, kode, pengujian, hingga pemeliharaan aplikasi. Siswa juga mempelajari pengembangan gim interaktif dan teknologi web modern.',
                'kurikulum' => 'Kurikulum Merdeka dengan penguatan Teaching Factory dan sertifikasi kompetensi BNSP.',
                'mataPelajaran' => [
                    'Pemrograman Web (HTML, CSS, JavaScript, PHP)',
                    'Pemrograman Aplikasi Mobile',
                    'Basis Data & SQL',
                    'Rekayasa Perangkat Lunak',
                    'Pengembangan Gim (Unity, Godot)',
                    'Jaringan Komputer Dasar',
                    'Desain UI/UX',
                    'Technopreneurship',
                ],
                'prospekKarier' => [
                    'Web Developer (Frontend / Backend / Fullstack)',
                    'Mobile App Developer',
                    'Game Developer',
                    'Software Quality Assurance (QA)',
                    'UI/UX Designer',
                    'IT Support & System Administrator',
                    'Freelancer / Wirausaha Digital',
                ],
                'fasilitas' => [
                    'Laboratorium Pemrograman (40 PC)',
                    'Laboratorium Gim & Multimedia',
                    'Server Local untuk Development',
                    'Akses Platform Belajar Online',
                ],
                'sertifikasi' => ['Junior Web Programmer (BNSP)', 'Mobile App Developer (BNSP)'],
            ],
            'TJKT' => [
                'shortCode' => 'TJKT',
                'name' => 'Teknik Jaringan Komputer dan Telekomunikasi',
                'image' => '/images/akademik-tjkt.jpg',
                'desc' => 'Program keahlian yang berfokus pada pemasangan, konfigurasi, dan pemeliharaan infrastruktur jaringan komputer serta sistem telekomunikasi. Siswa dibekali kemampuan administrasi server, keamanan siber, dan manajemen jaringan skala menengah hingga enterprise.',
                'kurikulum' => 'Kurikulum Merdeka dengan Teaching Factory berbasis proyek jaringan nyata dan sertifikasi kompetensi BNSP.',
                'mataPelajaran' => [
                    'Konfigurasi Jaringan (Cisco, MikroTik)',
                    'Administrasi Server (Linux & Windows)',
                    'Keamanan Jaringan (Cybersecurity)',
                    'Fiber Optik & Jaringan Nirkabel',
                    'Sistem Telekomunikasi',
                    'Cloud Computing Dasar',
                    'Pemrograman Web Dasar',
                    'Technopreneurship',
                ],
                'prospekKarier' => [
                    'Network Administrator',
                    'System Administrator',
                    'Network Engineer',
                    'Cybersecurity Analyst',
                    'IT Support & Helpdesk',
                    'Technician Fiber Optik',
                    'Cloud Engineer (Junior)',
                ],
                'fasilitas' => [
                    'Laboratorium Jaringan Komputer (Cisco & Perangkat Nyata)',
                    'Laboratorium Server & Cloud',
                    'Perangkat MikroTik & Cisco Router/Switch',
                    'Fiber Optik Training Kit',
                ],
                'sertifikasi' => ['CCNA (Cisco Certified Network Associate)', 'MTCNA (MikroTik Certified Network Associate)'],
            ],
            'TO' => [
                'shortCode' => 'TO',
                'name' => 'Teknik Otomotif',
                'image' => '/images/akademik-to.jpg',
                'desc' => 'Program keahlian yang membekali siswa dengan pengetahuan dan keterampilan dalam perawatan, perbaikan, serta diagnostic kendaraan bermotor. Siswa mempelajari sistem mesin, kelistrikan otomotif, sistem bahan bakar, rem, suspensi, dan teknologi kendaraan modern termasuk kendaraan listrik.',
                'kurikulum' => 'Kurikulum Merdeka dengan Teaching Factory berbasis bengkel produksi dan sertifikasi kompetensi BNSP.',
                'mataPelajaran' => [
                    'Mesin Mobil (Bensin & Diesel)',
                    'Kelistrikan Otomotif',
                    'Sistem Injeksi & Pemeliharaan',
                    'Sistem Rem & Suspensi',
                    'Transmisi & Kopling',
                    'Teknologi Kendaraan Listrik (EV)',
                    'Diagnostic & Troubleshooting',
                    'Technopreneurship',
                ],
                'prospekKarier' => [
                    'Mekanik Otomotif Profesional',
                    'Teknisi Service Dealer',
                    'Diagnostic Specialist',
                    'Foreman / Kepala Bengkel',
                    'Wirausaha Bengkel Mandiri',
                    'Teknisi Kendaraan Listrik (EV)',
                ],
                'fasilitas' => [
                    'Bengkel Otomotif Lengkap',
                    'Mesin Cutaway untuk Pembelajaran',
                    'Alat Diagnostic Scanner Modern',
                    'Unit Kendaraan Latih (bensin & diesel)',
                ],
                'sertifikasi' => ['Kompetensi Teknik Kendaraan Ringan (BNSP)', 'Teknisi Otomotif Dasar (BNSP)'],
            ],
            'TP' => [
                'shortCode' => 'TP',
                'name' => 'Teknik Pengelasan',
                'image' => '/images/akademik-tp.jpg',
                'desc' => 'Program keahlian yang berfokus pada teknik pengelasan logam (SMAW, GTAW, GMAW, FCAW), fabrikasi logam, pembacaan gambar teknik, penggunaan alat ukur presisi, dan penerapan standar keselamatan kerja industri. Siswa dibekali kemampuan kerja di industri manufaktur, galangan kapal, dan konstruksi baja.',
                'kurikulum' => 'Kurikulum Merdeka dengan Teaching Factory berbasis proyek fabrikasi nyata dan sertifikasi kompetensi BNSP.',
                'mataPelajaran' => [
                    'Pengelasan SMAW (Shielded Metal Arc Welding)',
                    'Pengelasan GTAW (TIG Welding)',
                    'Pengelasan GMAW (MIG/MAG Welding)',
                    'Pembacaan Gambar Teknik',
                    'Pengukuran & Peralatan Industri',
                    'Keselamatan & Kesehatan Kerja (K3)',
                    'Fabrikasi & Pemrosesan Logam',
                    'Technopreneurship',
                ],
                'prospekKarier' => [
                    'Welder Profesional (Sertifikat AWS/ASME)',
                    'Fabricator / Fabrikator Logam',
                    'Quality Control Inspector',
                    'Foreman Produksi',
                    'Teknisi Konstruksi Baja',
                    'Wirausaha Bidang Welding & Fabrikasi',
                ],
                'fasilitas' => [
                    'Bengkel Pengelasan (SMAW, TIG, MIG, FCAW)',
                    'Mesin Potong Plasma & Oxy-Acetylene',
                    'Mesin Bubut & Frais',
                    'Alat Ukur Presisi (Caliper, Micrometer)',
                ],
                'sertifikasi' => ['Welder SMAW 6G (BNSP)', 'Fabricator Welder (BNSP)'],
            ],
        ]);

        $program = $programs->get(strtoupper($kode));

        if (!$program) {
            abort(404, 'Program kompetensi keahlian tidak ditemukan');
        }

        return Inertia::render('Akademik/Show', [
            'program' => $program,
        ]);
    }
}