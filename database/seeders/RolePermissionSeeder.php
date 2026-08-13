<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Daftar permission granular per domain fitur (PRD §5 & §6.8).
     */
    public const PERMISSIONS = [
        'news.manage',       // Kelola berita + kategori
        'academic.manage',   // Kelola akademik (kompetensi, guru, jadwal, kalender, sarpras)
        'kesiswaan.manage',  // Kelola organisasi & ekstrakurikuler
        'product.manage',    // Kelola produk + kategori
        'homepage.manage',   // Kelola banner, testimoni, mitra
        'message.manage',    // Kelola pesan masuk dari form kontak
        'settings.manage',   // Kelola pengaturan situs
        'user.manage',       // Kelola akun admin (khusus super-admin)
    ];

    public function run(): void
    {
        // Buat semua permission (guard web).
        foreach (self::PERMISSIONS as $name) {
            Permission::firstOrCreate(['name' => $name, 'guard_name' => 'web']);
        }

        // Super Admin: seluruh permission.
        $superAdmin = Role::firstOrCreate(['name' => 'super-admin', 'guard_name' => 'web']);
        $superAdmin->syncPermissions(self::PERMISSIONS);

        // Admin: semua kecuali kelola user (user.manage khusus Super Admin).
        $admin = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $admin->syncPermissions(
            array_diff(self::PERMISSIONS, ['user.manage'])
        );
    }
}
