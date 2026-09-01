<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AcademicProgram extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'short_code',
        'description',
        'curriculum',
        'subjects',
        'career_prospects',
        'facilities',
        'certifications',
        'image',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'subjects' => 'array',
        'career_prospects' => 'array',
        'facilities' => 'array',
        'certifications' => 'array',
        'is_active' => 'boolean',
    ];

    /**
     * Guru yang mengajar di program ini.
     */
    public function teachers(): HasMany
    {
        return $this->hasMany(Teacher::class);
    }

    /**
     * Produk yang dibuat oleh siswa program ini.
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    /**
     * Scope: hanya program yang aktif.
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
