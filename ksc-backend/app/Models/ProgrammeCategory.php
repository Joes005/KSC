<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProgrammeCategory extends Model
{
    protected $guarded = [];

    public function university()
    {
        return $this->belongsTo(University::class);
    }

    public function programmes()
    {
        return $this->hasMany(Programme::class);
    }
}
