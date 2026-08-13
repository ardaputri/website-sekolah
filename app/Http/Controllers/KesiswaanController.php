<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class KesiswaanController extends Controller
{
    /**
     * Halaman Kesiswaan (organisasi, ekstrakurikuler, capaian, galeri).
     * Konten masih statis; data ekstrakurikuler & galeri dijadikan
     * dinamis pada fase berikutnya.
     */
    public function index(): Response
    {
        return Inertia::render('Kesiswaan');
    }
}
