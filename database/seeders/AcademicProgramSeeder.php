<?php

namespace Database\Seeders;

use App\Models\AcademicProgram;
use Illuminate\Database\Seeder;

class AcademicProgramSeeder extends Seeder
{
    public function run(): void
    {
        $programs = [
            [
                'name' => 'Pengembangan Perangkat Lunak dan Gim',
                'short_code' => 'PPLG',
                'description' => 'Program keahlian yang membekali siswa dengan keterampilan komprehensif dalam pengembangan perangkat lunak, mulai dari perencanaan, desain, kode, pengujian, hingga pemeliharaan aplikasi. Siswa juga mempelajari pengembangan gim interaktif dan teknologi web modern.',
                'curriculum' => 'Kurikulum Merdeka dengan penguatan Teaching Factory dan sertifikasi kompetensi BNSP.',
                'subjects' => [
                    'Pemrograman Web (HTML, CSS, JavaScript, PHP)',
                    'Pemrograman Aplikasi Mobile',
                    'Basis Data & SQL',
                    'Rekayasa Perangkat Lunak',
                    'Pengembangan Gim (Unity, Godot)',
                    'Jaringan Komputer Dasar',
                    'Desain UI/UX',
                    'Technopreneurship',
                ],
                'career_prospects' => [
                    'Web Developer (Frontend / Backend / Fullstack)',
                    'Mobile App Developer',
                    'Game Developer',
                    'Software Quality Assurance (QA)',
                    'UI/UX Designer',
                    'IT Support & System Administrator',
                    'Freelancer / Wirausaha Digital',
                ],
                'facilities' => [
                    'Laboratorium Pemrograman (40 PC)',
                    'Laboratorium Gim & Multimedia',
                    'Server Local untuk Development',
                    'Akses Platform Belajar Online',
                ],
                'certifications' => [
                    'Junior Web Programmer (BNSP)',
                    'Mobile App Developer (BNSP)',
                ],
                'image' => '/images/akademik-pplg.jpg',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Teknik Jaringan Komputer dan Telekomunikasi',
                'short_code' => 'TJKT',
                'description' => 'Program keahlian yang berfokus pada pemasangan, konfigurasi, dan pemeliharaan infrastruktur jaringan komputer serta sistem telekomunikasi. Siswa dibekali kemampuan administrasi server, keamanan siber, dan manajemen jaringan skala menengah hingga enterprise.',
                'curriculum' => 'Kurikulum Merdeka dengan Teaching Factory berbasis proyek jaringan nyata dan sertifikasi kompetensi BNSP.',
                'subjects' => [
                    'Konfigurasi Jaringan (Cisco, MikroTik)',
                    'Administrasi Server (Linux & Windows)',
                    'Keamanan Jaringan (Cybersecurity)',
                    'Fiber Optik & Jaringan Nirkabel',
                    'Sistem Telekomunikasi',
                    'Cloud Computing Dasar',
                    'Pemrograman Web Dasar',
                    'Technopreneurship',
                ],
                'career_prospects' => [
                    'Network Administrator',
                    'System Administrator',
                    'Network Engineer',
                    'Cybersecurity Analyst',
                    'IT Support & Helpdesk',
                    'Technician Fiber Optik',
                    'Cloud Engineer (Junior)',
                ],
                'facilities' => [
                    'Laboratorium Jaringan Komputer (Cisco & Perangkat Nyata)',
                    'Laboratorium Server & Cloud',
                    'Perangkat MikroTik & Cisco Router/Switch',
                    'Fiber Optik Training Kit',
                ],
                'certifications' => [
                    'CCNA (Cisco Certified Network Associate)',
                    'MTCNA (MikroTik Certified Network Associate)',
                ],
                'image' => '/images/akademik-tjkt.jpg',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Teknik Otomotif',
                'short_code' => 'TO',
                'description' => 'Program keahlian yang membekali siswa dengan pengetahuan dan keterampilan dalam perawatan, perbaikan, serta diagnostic kendaraan bermotor. Siswa mempelajari sistem mesin, kelistrikan otomotif, sistem bahan bakar, rem, suspensi, dan teknologi kendaraan modern termasuk kendaraan listrik.',
                'curriculum' => 'Kurikulum Merdeka dengan Teaching Factory berbasis bengkel produksi dan sertifikasi kompetensi BNSP.',
                'subjects' => [
                    'Mesin Mobil (Bensin & Diesel)',
                    'Kelistrikan Otomotif',
                    'Sistem Injeksi & Pemeliharaan',
                    'Sistem Rem & Suspensi',
                    'Transmisi & Kopling',
                    'Teknologi Kendaraan Listrik (EV)',
                    'Diagnostic & Troubleshooting',
                    'Technopreneurship',
                ],
                'career_prospects' => [
                    'Mekanik Otomotif Profesional',
                    'Teknisi Service Dealer',
                    'Diagnostic Specialist',
                    'Foreman / Kepala Bengkel',
                    'Wirausaha Bengkel Mandiri',
                    'Teknisi Kendaraan Listrik (EV)',
                ],
                'facilities' => [
                    'Bengkel Otomotif Lengkap',
                    'Mesin Cutaway untuk Pembelajaran',
                    'Alat Diagnostic Scanner Modern',
                    'Unit Kendaraan Latih (bensin & diesel)',
                ],
                'certifications' => [
                    'Kompetensi Teknik Kendaraan Ringan (BNSP)',
                    'Teknisi Otomotif Dasar (BNSP)',
                ],
                'image' => '/images/akademik-to.jpg',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Teknik Pengelasan',
                'short_code' => 'TP',
                'description' => 'Program keahlian yang berfokus pada teknik pengelasan logam (SMAW, GTAW, GMAW, FCAW), fabrikasi logam, pembacaan gambar teknik, penggunaan alat ukur presisi, dan penerapan standar keselamatan kerja industri. Siswa dibekali kemampuan kerja di industri manufaktur, galangan kapal, dan konstruksi baja.',
                'curriculum' => 'Kurikulum Merdeka dengan Teaching Factory berbasis proyek fabrikasi nyata dan sertifikasi kompetensi BNSP.',
                'subjects' => [
                    'Pengelasan SMAW (Shielded Metal Arc Welding)',
                    'Pengelasan GTAW (TIG Welding)',
                    'Pengelasan GMAW (MIG/MAG Welding)',
                    'Pembacaan Gambar Teknik',
                    'Pengukuran & Peralatan Industri',
                    'Keselamatan & Kesehatan Kerja (K3)',
                    'Fabrikasi & Pemrosesan Logam',
                    'Technopreneurship',
                ],
                'career_prospects' => [
                    'Welder Profesional (Sertifikat AWS/ASME)',
                    'Fabricator / Fabrikator Logam',
                    'Quality Control Inspector',
                    'Foreman Produksi',
                    'Teknisi Konstruksi Baja',
                    'Wirausaha Bidang Welding & Fabrikasi',
                ],
                'facilities' => [
                    'Bengkel Pengelasan (SMAW, TIG, MIG, FCAW)',
                    'Mesin Potong Plasma & Oxy-Acetylene',
                    'Mesin Bubut & Frais',
                    'Alat Ukur Presisi (Caliper, Micrometer)',
                ],
                'certifications' => [
                    'Welder SMAW 6G (BNSP)',
                    'Fabricator Welder (BNSP)',
                ],
                'image' => '/images/akademik-tp.jpg',
                'is_active' => true,
                'sort_order' => 4,
            ],
        ];

        foreach ($programs as $data) {
            AcademicProgram::updateOrCreate(
                ['short_code' => $data['short_code']],
                $data
            );
        }
    }
}
