<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Organization;
use App\Models\Extracurricular;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class KesiswaanController extends Controller
{
    /**
     * Tampilkan daftar organisasi.
     */
    public function organizationIndex()
    {
        $organizations = Organization::ordered()->get();

        return Inertia::render('Admin/Kesiswaan/Organization', [
            'organizations' => $organizations,
        ]);
    }

    /**
     * Simpan organisasi baru.
     */
    public function organizationStore(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'vision' => 'nullable|string',
            'mission' => 'nullable|string',
            'period' => 'nullable|string|max:50',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        $validated['is_active'] = true;

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('organizations', 'public');
        }

        Organization::create($validated);

        return redirect()->back()->with('success', 'Organisasi berhasil ditambahkan.');
    }

    /**
     * Perbarui organisasi.
     */
    public function organizationUpdate(Request $request, Organization $organization)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'vision' => 'nullable|string',
            'mission' => 'nullable|string',
            'period' => 'nullable|string|max:50',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($organization->name !== $validated['name']) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        if ($request->hasFile('image')) {
            if ($organization->image && Storage::disk('public')->exists($organization->image)) {
                Storage::disk('public')->delete($organization->image);
            }
            $validated['image'] = $request->file('image')->store('organizations', 'public');
        }

        $organization->update($validated);

        return redirect()->back()->with('success', 'Organisasi berhasil diperbarui.');
    }

    /**
     * Hapus organisasi.
     */
    public function organizationDestroy(Organization $organization)
    {
        if ($organization->image && Storage::disk('public')->exists($organization->image)) {
            Storage::disk('public')->delete($organization->image);
        }

        $organization->delete();

        return redirect()->back()->with('success', 'Organisasi berhasil dihapus.');
    }

    /**
     * Tampilkan daftar ekstrakurikuler.
     */
    public function extracurricularIndex()
    {
        $extracurriculars = Extracurricular::ordered()->get();

        return Inertia::render('Admin/Kesiswaan/Extracurricular', [
            'extracurriculars' => $extracurriculars,
        ]);
    }

    /**
     * Simpan ekstrakurikuler baru.
     */
    public function extracurricularStore(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'schedule' => 'nullable|string|max:255',
            'coach_name' => 'nullable|string|max:255',
            'coach_phone' => 'nullable|string|max:50',
            'location' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        $validated['is_active'] = true;

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('extracurriculars', 'public');
        }

        Extracurricular::create($validated);

        return redirect()->back()->with('success', 'Ekstrakurikuler berhasil ditambahkan.');
    }

    /**
     * Perbarui ekstrakurikuler.
     */
    public function extracurricularUpdate(Request $request, Extracurricular $extracurricular)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'schedule' => 'nullable|string|max:255',
            'coach_name' => 'nullable|string|max:255',
            'coach_phone' => 'nullable|string|max:50',
            'location' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($extracurricular->name !== $validated['name']) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        if ($request->hasFile('image')) {
            if ($extracurricular->image && Storage::disk('public')->exists($extracurricular->image)) {
                Storage::disk('public')->delete($extracurricular->image);
            }
            $validated['image'] = $request->file('image')->store('extracurriculars', 'public');
        }

        $extracurricular->update($validated);

        return redirect()->back()->with('success', 'Ekstrakurikuler berhasil diperbarui.');
    }

    /**
     * Hapus ekstrakurikuler.
     */
    public function extracurricularDestroy(Extracurricular $extracurricular)
    {
        if ($extracurricular->image && Storage::disk('public')->exists($extracurricular->image)) {
            Storage::disk('public')->delete($extracurricular->image);
        }

        $extracurricular->delete();

        return redirect()->back()->with('success', 'Ekstrakurikuler berhasil dihapus.');
    }
}
