<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Halaman beranda publik.
     * Data dinamis (banner, berita terbaru, dll) diisi pada Fase 1.
     */
    public function index(): Response
    {
        return Inertia::render('Home');
    }
}
