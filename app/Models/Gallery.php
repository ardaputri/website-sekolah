<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Gallery extends Model
{
    protected $fillable = [
        'image_path',
        'caption',
        'order',
    ];

    public function galleryable(): MorphTo
    {
        return $this->morphTo();
    }
}
