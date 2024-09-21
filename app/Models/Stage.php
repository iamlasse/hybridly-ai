<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * @mixin IdeHelperStage
 */
class Stage extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'order', 'project_id', 'slug'];

    public function stageable(): MorphTo
    {
        return $this->morphTo();
    }
}
