<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class ContactReview extends Model
{
    protected $fillable = [
        'name',
        'email',
        'rating',
        'comment',
        'is_approved',
    ];

    protected $casts = [
        'rating' => 'integer',
        'is_approved' => 'boolean',
    ];

    /** Hanya ulasan yang sudah disetujui yang tampil publik. */
    public function scopeApproved(Builder $query): Builder
    {
        return $query->where('is_approved', true);
    }

    /** Rata-rata rating dari seluruh ulasan yang disetujui. */
    public static function averageRating(): float
    {
        return (float) round((float) self::approved()->avg('rating'), 1);
    }

    /** Jumlah ulasan yang disetujui. */
    public static function totalReviews(): int
    {
        return self::approved()->count();
    }
}
