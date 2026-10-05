<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsEvent extends Model
{
    /** Notice types the frontend understands (value => admin label). */
    public const TYPES = [
        'admission' => 'Admission',
        'deadline' => 'Deadline',
        'exam' => 'Exam (results, hall tickets, time-tables)',
        'event' => 'General / Event',
    ];

    protected $fillable = [
        'title',
        'badge',
        'type',
        'link',
        'pdf_path',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}