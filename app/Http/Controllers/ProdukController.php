<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class ProdukController extends Controller
{
    /**
     * Halaman Produk / Etalase karya siswa.
     * Konten masih statis (data contoh); dijadikan dinamis dari database
     * pada fase CRUD Produk berikutnya.
     */
    public function index(): Response
    {
        return Inertia::render('Produk');
    }
}
