<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Academic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AcademicController extends Controller
{
    public function index(Request $request)
    {
        $query = Academic::query();

        // Filter by rombel
        if ($request->filled('rombel')) {
            $query->where('rombel', $request->rombel);
        }

        // Filter by jurusan
        if ($request->filled('jurusan')) {
            $query->where('jurusan', $request->jurusan);
        }

        // Filter by hari
        if ($request->filled('hari')) {
            $query->where('hari', $request->hari);
        }

        $academics = $query->orderBy('rombel')
            ->orderByRaw("FIELD(hari, 'senin','selasa','rabu','kamis','jumat')")
            ->orderBy('jam_mulai')
            ->get();

        // Get unique rombels for filter
        $rombels = Academic::distinct()->pluck('rombel')->sort()->values();
        $jurusanList = ['PPLG', 'TJKT', 'TO', 'TP'];
        $hariList = ['senin', 'selasa', 'rabu', 'kamis', 'jumat'];

        return Inertia::render('Admin/Academic/Index', [
            'academics' => $academics,
            'rombels' => $rombels,
            'jurusanList' => $jurusanList,
            'hariList' => $hariList,
            'filters' => $request->only(['rombel', 'jurusan', 'hari']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kelas'           => 'required|string',
            'jurusan'         => 'required|string',
            'rombel'          => 'required|string',
            'hari'            => 'required|string|in:senin,selasa,rabu,kamis,jumat',
            'mata_pelajaran'  => 'required|string',
            'jam_mulai'       => 'required|string',
            'jam_selesai'     => 'required|string',
            'guru'            => 'nullable|string',
            'ruang'           => 'nullable|string',
        ]);

        Academic::create($validated);

        return redirect()->back()->with('success', 'Jadwal pelajaran berhasil ditambahkan.');
    }

    public function update(Request $request, Academic $academic)
    {
        $validated = $request->validate([
            'kelas'           => 'required|string',
            'jurusan'         => 'required|string',
            'rombel'          => 'required|string',
            'hari'            => 'required|string|in:senin,selasa,rabu,kamis,jumat',
            'mata_pelajaran'  => 'required|string',
            'jam_mulai'       => 'required|string',
            'jam_selesai'     => 'required|string',
            'guru'            => 'nullable|string',
            'ruang'           => 'nullable|string',
        ]);

        $academic->update($validated);

        return redirect()->back()->with('success', 'Jadwal pelajaran berhasil diupdate.');
    }

    public function destroy(Academic $academic)
    {
        $academic->delete();

        return redirect()->back()->with('success', 'Jadwal pelajaran berhasil dihapus.');
    }
}
