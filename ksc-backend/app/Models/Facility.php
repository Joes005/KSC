<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Str;

class Facility extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image_path',
        'icon',
    ];

    protected function imagePath(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? Str::after($value, 'storage/app/public/') : null,
            set: fn ($value) => $value
                ? (Str::startsWith($value, ['http://', 'https://', '/assets/'])
                    ? $value
                    : (Str::startsWith($value, 'storage/app/public/') ? $value : 'storage/app/public/' . ltrim($value, '/')))
                : null,
        );
    }
}