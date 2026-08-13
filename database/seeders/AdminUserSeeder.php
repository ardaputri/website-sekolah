<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        // Akun Super Admin default. GANTI password ini setelah login pertama.
        $superAdmin = User::updateOrCreate(
            ['email' => 'superadmin@sekolah.test'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'is_active' => true,
            ]
        );
        $superAdmin->syncRoles(['super-admin']);

        // Akun Admin contoh.
        $admin = User::updateOrCreate(
            ['email' => 'admin@sekolah.test'],
            [
                'name' => 'Admin Sekolah',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'is_active' => true,
            ]
        );
        $admin->syncRoles(['admin']);
    }
}
