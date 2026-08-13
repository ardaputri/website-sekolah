<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Dashboard admin (ringkasan).
     * Statistik & grafik diisi pada Fase 2.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard');
    }
}
