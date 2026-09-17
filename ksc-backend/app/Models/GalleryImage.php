<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Str;

class GalleryImage extends Model
{
    protected $fillable = [
        'image_path',
        'caption',
        'alt',
        'sort_order',
    ];

    protected $casts = [
        'sort_order' => 'integer',
    ];

    protected function imagePath(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => $value
                ? (Str::startsWith($value, ['http://', 'https://', '/assets/'])
                    ? $value
                    : (Str::startsWith($value, 'storage/app/public/') ? $value : 'storage/app/public/' . ltrim($value, '/')))
                : null,
        );
    }
}