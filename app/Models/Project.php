<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Project extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    public function stages(): MorphMany
    {
        return $this->morphMany(Stage::class, 'stageable');
    }

    public function collaborators(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'project_collaborators', 'project_id', 'collaborator_id');
    }
}
