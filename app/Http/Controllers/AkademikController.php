<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class AkademikController extends Controller
{
    /**
     * Halaman Akademik: konsentrasi keahlian, kurikulum, dan kegiatan
     * pembelajaran. Konten masih statis (data contoh); dijadikan dinamis
     * dari database pada fase CRUD Akademik berikutnya.
     */
    public function index(): Response
    {
        return Inertia::render('Akademik');
    }
}
