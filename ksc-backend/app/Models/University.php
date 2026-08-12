<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class University extends Model
{
    protected $guarded = [];

    public function categories()
    {
        return $this->hasMany(ProgrammeCategory::class);
    }
}
