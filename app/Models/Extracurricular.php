<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Extracurricular extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'schedule',
        'coach_name',
        'coach_phone',
        'location',
        'image',
        'achievements',
        'gallery',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'achievements' => 'array',
        'gallery' => 'array',
        'is_active' => 'boolean',
    ];

    /**
     * Scope: hanya ekskul yang aktif.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope: urutkan berdasarkan sort_order.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('name');
    }
}
