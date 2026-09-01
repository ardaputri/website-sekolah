<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Academic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AcademicController extends Controller
{
    // Tampilan Dashboard Admin
    public function index()
    {
        $academics = Academic::latest()->get();

        return Inertia::render('Admin/Academic/Index', [
            'academics' => $academics
        ]);
    }

    // Tambah Data Jadwal
    public function store(Request $request)
    {
        $validated = $request->validate([
            'kelas'   => 'required|string',
            'jurusan' => 'required|string',
            'rombel'  => 'required|string',
            'waktu'   => 'required|string',
            'senin'   => 'nullable|string',
            'selasa'  => 'nullable|string',
            'rabu'    => 'nullable|string',
            'kamis'   => 'nullable|string',
            'jumat'   => 'nullable|string',
        ]);

        Academic::create($validated);

        return redirect()->back();
    }

    // Edit Data Jadwal
    public function update(Request $request, Academic $academic)
    {
        $validated = $request->validate([
            'kelas'   => 'required|string',
            'jurusan' => 'required|string',
            'rombel'  => 'required|string',
            'waktu'   => 'required|string',
            'senin'   => 'nullable|string',
            'selasa'  => 'nullable|string',
            'rabu'    => 'nullable|string',
            'kamis'   => 'nullable|string',
            'jumat'   => 'nullable|string',
        ]);

        $academic->update($validated);

        return redirect()->back();
    }

    // Hapus Data Jadwal
    public function destroy(Academic $academic)
    {
        $academic->delete();

        return redirect()->back();
    }
}