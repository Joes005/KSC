<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Str;

class UserUpdatePoster extends Model
{
    use HasFactory;

    protected $fillable = [
        'image_path',
        'is_active',
        'sort_order',
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
