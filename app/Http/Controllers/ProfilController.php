<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class ProfilController extends Controller
{
    /**
     * Halaman Profil Sekolah: sambutan kepala sekolah, visi & misi,
     * sejarah singkat, dan fasilitas. Konten masih statis (data contoh);
     * dijadikan dinamis dari pengaturan/database pada fase berikutnya.
     */
    public function index(): Response
    {
        return Inertia::render('Profil');
    }
}
