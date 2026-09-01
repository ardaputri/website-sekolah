<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use App\Models\AcademicProgram;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TeacherController extends Controller
{
    /**
     * Tampilkan daftar guru.
     */
    public function index(Request $request)
    {
        $query = Teacher::with('academicProgram')->latest();

        if ($request->filled('program_id')) {
            $query->where('academic_program_id', $request->program_id);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('subject', 'like', "%{$search}%")
                  ->orWhere('nip', 'like', "%{$search}%");
            });
        }

        $teachers = $query->paginate(15)->withQueryString();
        $programs = AcademicProgram::active()->ordered()->get();

        return Inertia::render('Admin/Teachers/Index', [
            'teachers' => $teachers,
            'programs' => $programs,
            'filters' => $request->only(['search', 'program_id']),
        ]);
    }

    /**
     * Simpan guru baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'nip' => 'nullable|string|max:50',
            'position' => 'nullable|string|max:255',
            'subject' => 'nullable|string|max:255',
            'academic_program_id' => 'nullable|exists:academic_programs,id',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'bio' => 'nullable|string',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')->store('teachers', 'public');
        }

        $validated['is_active'] = true;

        Teacher::create($validated);

        return redirect()->back()->with('success', 'Guru berhasil ditambahkan.');
    }

    /**
     * Perbarui data guru.
     */
    public function update(Request $request, Teacher $teacher)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'nip' => 'nullable|string|max:50',
            'position' => 'nullable|string|max:255',
            'subject' => 'nullable|string|max:255',
            'academic_program_id' => 'nullable|exists:academic_programs,id',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'bio' => 'nullable|string',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            if ($teacher->photo && Storage::disk('public')->exists($teacher->photo)) {
                Storage::disk('public')->delete($teacher->photo);
            }
            $validated['photo'] = $request->file('photo')->store('teachers', 'public');
        }

        $teacher->update($validated);

        return redirect()->back()->with('success', 'Data guru berhasil diperbarui.');
    }

    /**
     * Hapus data guru.
     */
    public function destroy(Teacher $teacher)
    {
        if ($teacher->photo && Storage::disk('public')->exists($teacher->photo)) {
            Storage::disk('public')->delete($teacher->photo);
        }

        $teacher->delete();

        return redirect()->back()->with('success', 'Data guru berhasil dihapus.');
    }
}
