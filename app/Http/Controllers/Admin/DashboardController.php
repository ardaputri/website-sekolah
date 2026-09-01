<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\Teacher;
use App\Models\ContactMessage;
use App\Models\Product;
use App\Models\AcademicProgram;
use App\Models\Extracurricular;
use App\Models\Organization;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalBerita'        => News::count(),
                'totalGuru'          => Teacher::count(),
                'totalProduk'        => Product::count(),
                'totalPesan'         => ContactMessage::count(),
                'pesanBelumDibaca'   => ContactMessage::where('is_read', false)->count(),
                'totalAdmin'         => DB::table('model_has_roles')
                    ->join('roles', 'roles.id', '=', 'model_has_roles.role_id')
                    ->whereIn('roles.name', ['admin', 'super-admin'])
                    ->count(),
                'totalProgramAkademik'=> AcademicProgram::count(),
                'totalEkskul'        => Extracurricular::count(),
                'totalOrganisasi'    => Organization::count(),
            ],
            'beritaTerbaru' => News::latest()->take(4)->get()->map(function ($item) {
                return [
                    'id'       => $item->id,
                    'title'    => $item->title,
                    'date'     => $item->created_at ? $item->created_at->format('d M Y') : '-',
                    'category' => $item->category,
                    'status'   => $item->status,
                ];
            }),
            'pesanTerbaru' => ContactMessage::latest()->take(5)->get()->map(function ($item) {
                return [
                    'id'       => $item->id,
                    'name'     => $item->name,
                    'email'    => $item->email,
                    'subject'  => $item->subject,
                    'is_read'  => $item->is_read,
                    'date'     => $item->created_at ? $item->created_at->diffForHumans() : '-',
                ];
            }),
        ]);
    }
}