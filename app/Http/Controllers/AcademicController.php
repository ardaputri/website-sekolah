<?php

namespace App\Http\Controllers;

use App\Models\Academic;
use App\Models\AcademicProgram;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AcademicController extends Controller
{
    public function index()
    {
        $academics = Academic::all();
        $programs = AcademicProgram::active()->ordered()->get();

        return Inertia::render('Akademik', [
            'academics' => $academics,
            'programs' => $programs,
        ]);
    }

    /**
     * Halaman Detail Kompetensi Keahlian dari database.
     */
    public function show($kode)
    {
        $program = AcademicProgram::whereRaw('UPPER(short_code) = ?', [strtoupper($kode)])->firstOrFail();

        // Ambil program lainnya untuk section terkait
        $related = AcademicProgram::active()
            ->where('id', '!=', $program->id)
            ->ordered()
            ->limit(3)
            ->get(['id', 'name', 'short_code', 'description', 'image']);

        return Inertia::render('Akademik/Show', [
            'program' => $program,
            'related' => $related,
        ]);
    }
}
