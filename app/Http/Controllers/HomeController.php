<?php

namespace App\Http\Controllers;

use App\Models\Extracurricular;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Halaman beranda publik.
     */
    public function index(): Response
    {
        // Ambil 3 ekskul teratas dari database
        $ekskulHighlight = Extracurricular::active()
            ->orderBy('sort_order')
            ->limit(3)
            ->get(['id', 'name', 'slug', 'description', 'image'])
            ->map(fn($e) => [
                'name' => $e->name,
                'slug' => $e->slug,
                'desc' => \Str::limit(strip_tags($e->description), 100),
                'image' => $e->image ? '/storage/' . $e->image : null,
            ]);

        return Inertia::render('Home', [
            'ekskulHighlightDB' => $ekskulHighlight,
        ]);
    }
}
