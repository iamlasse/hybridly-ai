<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Dependency extends Pivot
{
    protected $guarded = [];

    protected $casts = [
        "dependency_type"=> "string",
    ];

    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class);
    }

    public function dependent(): BelongsTo
    {
        return $this->belongsTo(Task::class);
    }
}
