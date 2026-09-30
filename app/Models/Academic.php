<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Academic extends Model
{
    use HasFactory;

    protected $fillable = [
        'kelas',
        'jurusan',
        'rombel',
        'hari',
        'mata_pelajaran',
        'jam_mulai',
        'jam_selesai',
        'guru',
        'ruang',
    ];

    // Scope: filter by rombel
    public function scopeRombel($query, $rombel)
    {
        return $query->where('rombel', $rombel);
    }

    // Scope: filter by hari
    public function scopeHari($query, $hari)
    {
        return $query->where('hari', $hari);
    }

    // Scope: filter by jurusan
    public function scopeJurusan($query, $jurusan)
    {
        return $query->where('jurusan', $jurusan);
    }
}
