<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use App\Models\Extracurricular;
use Inertia\Inertia;
use Inertia\Response;

class KesiswaanController extends Controller
{
    /**
     * Halaman Kesiswaan — daftar organisasi & ekstrakurikuler dari database.
     */
    public function index(): Response
    {
        $organizations = Organization::active()->ordered()->get();
        $extracurriculars = Extracurricular::active()->ordered()->get();

        return Inertia::render('Kesiswaan', [
            'organizations' => $organizations,
            'extracurriculars' => $extracurriculars,
        ]);
    }

    /**
     * Halaman detail ekstrakurikuler / organisasi.
     * Type: "ekskul" atau "organisasi"
     */
    public function show(string $type, string $slug): Response
    {
        if ($type === 'ekskul') {
            $item = Extracurricular::where('slug', $slug)->active()->firstOrFail();
            $related = Extracurricular::active()
                ->where('id', '!=', $item->id)
                ->ordered()
                ->take(3)
                ->get();

            return Inertia::render('Kesiswaan/Show', [
                'type' => 'ekskul',
                'item' => $item,
                'related' => $related,
            ]);
        }

        if ($type === 'organisasi') {
            $item = Organization::where('slug', $slug)->active()->firstOrFail();
            $related = Organization::active()
                ->where('id', '!=', $item->id)
                ->ordered()
                ->take(3)
                ->get();

            return Inertia::render('Kesiswaan/Show', [
                'type' => 'organisasi',
                'item' => $item,
                'related' => $related,
            ]);
        }

        abort(404);
    }
}
