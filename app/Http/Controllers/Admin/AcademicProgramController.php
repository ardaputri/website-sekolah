<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AcademicProgram;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AcademicProgramController extends Controller
{
    public function index()
    {
        $programs = AcademicProgram::orderBy('sort_order')->get();

        return Inertia::render('Admin/AcademicPrograms/Index', [
            'programs' => $programs,
        ]);
    }

    /**
     * Convert newline-separated string to array (trim + remove empty lines).
     */
    private function toArray($value): ?array
    {
        if (is_array($value)) return $value;
        if (empty($value)) return [];
        return array_values(array_filter(array_map('trim', explode("\n", $value))));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'              => 'required|string|max:255',
            'short_code'        => 'required|string|max:10|unique:academic_programs,short_code',
            'description'       => 'nullable|string',
            'curriculum'        => 'nullable|string',
            'subjects'          => 'nullable|string',
            'career_prospects'  => 'nullable|string',
            'facilities'        => 'nullable|string',
            'certifications'    => 'nullable|string',
            'image'             => 'nullable|image|max:5120',
            'is_active'         => 'boolean',
            'sort_order'        => 'nullable|integer|min:0',
        ]);

        $data = [
            'name'              => $validated['name'],
            'short_code'        => strtoupper($validated['short_code']),
            'description'       => $validated['description'] ?? null,
            'curriculum'        => $validated['curriculum'] ?? null,
            'subjects'          => $this->toArray($validated['subjects'] ?? null),
            'career_prospects'  => $this->toArray($validated['career_prospects'] ?? null),
            'facilities'        => $this->toArray($validated['facilities'] ?? null),
            'certifications'    => $this->toArray($validated['certifications'] ?? null),
            'is_active'         => $validated['is_active'] ?? true,
            'sort_order'        => $validated['sort_order'] ?? 0,
        ];

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('academic_programs', 'public');
        }

        AcademicProgram::create($data);

        return redirect()->back()->with('success', 'Program keahlian berhasil ditambahkan.');
    }

    public function update(Request $request, AcademicProgram $academicProgram)
    {
        $validated = $request->validate([
            'name'              => 'required|string|max:255',
            'short_code'        => 'required|string|max:10|unique:academic_programs,short_code,' . $academicProgram->id,
            'description'       => 'nullable|string',
            'curriculum'        => 'nullable|string',
            'subjects'          => 'nullable|string',
            'career_prospects'  => 'nullable|string',
            'facilities'        => 'nullable|string',
            'certifications'    => 'nullable|string',
            'image'             => 'nullable|image|max:5120',
            'is_active'         => 'boolean',
            'sort_order'        => 'nullable|integer|min:0',
        ]);

        $data = [
            'name'              => $validated['name'],
            'short_code'        => strtoupper($validated['short_code']),
            'description'       => $validated['description'] ?? null,
            'curriculum'        => $validated['curriculum'] ?? null,
            'subjects'          => $this->toArray($validated['subjects'] ?? null),
            'career_prospects'  => $this->toArray($validated['career_prospects'] ?? null),
            'facilities'        => $this->toArray($validated['facilities'] ?? null),
            'certifications'    => $this->toArray($validated['certifications'] ?? null),
            'is_active'         => $validated['is_active'] ?? true,
            'sort_order'        => $validated['sort_order'] ?? 0,
        ];

        if ($request->hasFile('image')) {
            // Delete old image from storage
            if ($academicProgram->image && str_starts_with($academicProgram->image, 'academic_programs/')) {
                \Storage::disk('public')->delete($academicProgram->image);
            }
            $data['image'] = $request->file('image')->store('academic_programs', 'public');
        }

        $academicProgram->update($data);

        return redirect()->back()->with('success', 'Program keahlian berhasil diupdate.');
    }

    public function destroy(AcademicProgram $academicProgram)
    {
        // Delete image from storage
        if ($academicProgram->image && str_starts_with($academicProgram->image, 'academic_programs/')) {
            \Storage::disk('public')->delete($academicProgram->image);
        }

        $academicProgram->delete();

        return redirect()->back()->with('success', 'Program keahlian berhasil dihapus.');
    }
}
