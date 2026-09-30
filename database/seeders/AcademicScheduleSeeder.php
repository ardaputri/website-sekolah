<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Academic;

class AcademicScheduleSeeder extends Seeder
{
    public function run(): void
    {
        $schedule = [
            // PPLG 1 - Senin
            ['kelas' => 'X', 'jurusan' => 'PPLG', 'rombel' => 'PPLG 1', 'hari' => 'senin', 'mata_pelajaran' => 'Matematika', 'jam_mulai' => '07:00', 'jam_selesai' => '09:00', 'guru' => 'Pak Budi', 'ruang' => 'R.101'],
            ['kelas' => 'X', 'jurusan' => 'PPLG', 'rombel' => 'PPLG 1', 'hari' => 'senin', 'mata_pelajaran' => 'Bahasa Indonesia', 'jam_mulai' => '09:00', 'jam_selesai' => '11:00', 'guru' => 'Bu Sari', 'ruang' => 'R.101'],
            ['kelas' => 'X', 'jurusan' => 'PPLG', 'rombel' => 'PPLG 1', 'hari' => 'senin', 'mata_pelajaran' => 'Pemrograman Dasar', 'jam_mulai' => '13:00', 'jam_selesai' => '15:00', 'guru' => 'Pak Andi', 'ruang' => 'Lab.Komputer'],

            // PPLG 1 - Selasa
            ['kelas' => 'X', 'jurusan' => 'PPLG', 'rombel' => 'PPLG 1', 'hari' => 'selasa', 'mata_pelajaran' => 'Bahasa Inggris', 'jam_mulai' => '07:00', 'jam_selesai' => '09:00', 'guru' => 'Bu Maya', 'ruang' => 'R.101'],
            ['kelas' => 'X', 'jurusan' => 'PPLG', 'rombel' => 'PPLG 1', 'hari' => 'selasa', 'mata_pelajaran' => 'Pemrograman Web', 'jam_mulai' => '09:00', 'jam_selesai' => '11:00', 'guru' => 'Pak Andi', 'ruang' => 'Lab.Komputer'],

            // PPLG 1 - Rabu
            ['kelas' => 'X', 'jurusan' => 'PPLG', 'rombel' => 'PPLG 1', 'hari' => 'rabu', 'mata_pelajaran' => 'Pendidikan Agama', 'jam_mulai' => '07:00', 'jam_selesai' => '09:00', 'guru' => 'Pak Hidayat', 'ruang' => 'R.101'],
            ['kelas' => 'X', 'jurusan' => 'PPLG', 'rombel' => 'PPLG 1', 'hari' => 'rabu', 'mata_pelajaran' => 'Basis Data', 'jam_mulai' => '09:00', 'jam_selesai' => '11:00', 'guru' => 'Pak Andi', 'ruang' => 'Lab.Komputer'],

            // PPLG 1 - Kamis
            ['kelas' => 'X', 'jurusan' => 'PPLG', 'rombel' => 'PPLG 1', 'hari' => 'kamis', 'mata_pelajaran' => 'Pendidikan Pancasila', 'jam_mulai' => '07:00', 'jam_selesai' => '09:00', 'guru' => 'Bu Rina', 'ruang' => 'R.101'],
            ['kelas' => 'X', 'jurusan' => 'PPLG', 'rombel' => 'PPLG 1', 'hari' => 'kamis', 'mata_pelajaran' => 'Desain UI/UX', 'jam_mulai' => '09:00', 'jam_selesai' => '11:00', 'guru' => 'Bu Dewi', 'ruang' => 'Lab.Komputer'],

            // PPLG 1 - Jumat
            ['kelas' => 'X', 'jurusan' => 'PPLG', 'rombel' => 'PPLG 1', 'hari' => 'jumat', 'mata_pelajaran' => 'PJOK', 'jam_mulai' => '07:00', 'jam_selesai' => '09:00', 'guru' => 'Pak Joko', 'ruang' => 'Lapangan'],
            ['kelas' => 'X', 'jurusan' => 'PPLG', 'rombel' => 'PPLG 1', 'hari' => 'jumat', 'mata_pelajaran' => 'Bahasa Sunda', 'jam_mulai' => '09:00', 'jam_selesai' => '10:30', 'guru' => 'Pak Dedi', 'ruang' => 'R.101'],

            // TJKT 1 - Senin
            ['kelas' => 'X', 'jurusan' => 'TJKT', 'rombel' => 'TJKT 1', 'hari' => 'senin', 'mata_pelajaran' => 'Matematika', 'jam_mulai' => '07:00', 'jam_selesai' => '09:00', 'guru' => 'Pak Budi', 'ruang' => 'R.201'],
            ['kelas' => 'X', 'jurusan' => 'TJKT', 'rombel' => 'TJKT 1', 'hari' => 'senin', 'mata_pelajaran' => 'Jaringan Komputer', 'jam_mulai' => '09:00', 'jam_selesai' => '11:00', 'guru' => 'Pak Rizal', 'ruang' => 'Lab.Jaringan'],

            // TJKT 1 - Selasa
            ['kelas' => 'X', 'jurusan' => 'TJKT', 'rombel' => 'TJKT 1', 'hari' => 'selasa', 'mata_pelajaran' => 'Bahasa Indonesia', 'jam_mulai' => '07:00', 'jam_selesai' => '09:00', 'guru' => 'Bu Sari', 'ruang' => 'R.201'],
            ['kelas' => 'X', 'jurusan' => 'TJKT', 'rombel' => 'TJKT 1', 'hari' => 'selasa', 'mata_pelajaran' => 'Sistem Operasi', 'jam_mulai' => '09:00', 'jam_selesai' => '11:00', 'guru' => 'Pak Rizal', 'ruang' => 'Lab.Jaringan'],

            // TJKT 1 - Rabu
            ['kelas' => 'X', 'jurusan' => 'TJKT', 'rombel' => 'TJKT 1', 'hari' => 'rabu', 'mata_pelajaran' => 'Pendidikan Agama', 'jam_mulai' => '07:00', 'jam_selesai' => '09:00', 'guru' => 'Pak Hidayat', 'ruang' => 'R.201'],
            ['kelas' => 'X', 'jurusan' => 'TJKT', 'rombel' => 'TJKT 1', 'hari' => 'rabu', 'mata_pelajaran' => 'Keamanan Jaringan', 'jam_mulai' => '09:00', 'jam_selesai' => '11:00', 'guru' => 'Pak Rizal', 'ruang' => 'Lab.Jaringan'],

            // TO 1 - Senin
            ['kelas' => 'X', 'jurusan' => 'TO', 'rombel' => 'TO 1', 'hari' => 'senin', 'mata_pelajaran' => 'Matematika', 'jam_mulai' => '07:00', 'jam_selesai' => '09:00', 'guru' => 'Pak Budi', 'ruang' => 'R.301'],
            ['kelas' => 'X', 'jurusan' => 'TO', 'rombel' => 'TO 1', 'hari' => 'senin', 'mata_pelajaran' => 'Mekanik Kendaraan Ringan', 'jam_mulai' => '09:00', 'jam_selesai' => '11:00', 'guru' => 'Pak Asep', 'ruang' => 'Bengkel Otomotif'],

            // TP 1 - Senin
            ['kelas' => 'X', 'jurusan' => 'TP', 'rombel' => 'TP 1', 'hari' => 'senin', 'mata_pelajaran' => 'Matematika', 'jam_mulai' => '07:00', 'jam_selesai' => '09:00', 'guru' => 'Pak Budi', 'ruang' => 'R.401'],
            ['kelas' => 'X', 'jurusan' => 'TP', 'rombel' => 'TP 1', 'hari' => 'senin', 'mata_pelajaran' => 'Gambar Teknik', 'jam_mulai' => '09:00', 'jam_selesai' => '11:00', 'guru' => 'Pak Hendra', 'ruang' => 'Lab.Gambar Teknik'],
        ];

        foreach ($schedule as $item) {
            Academic::create($item);
        }
    }
}
