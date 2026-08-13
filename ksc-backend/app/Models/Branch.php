<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    protected $fillable = [
        'name',
        'address',
        'phone',
        'hours',
        'is_head_office',
        'sort_order',
    ];

    protected $casts = [
        'is_head_office' => 'boolean',
        'sort_order' => 'integer',
    ];
}