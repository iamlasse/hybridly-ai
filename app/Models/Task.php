<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * @mixin IdeHelperTask
 */
class Task extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'description' => 'json',
        'subtasks' => 'json',
        'completed_at' => 'datetime',
        'due_date' => 'datetime',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function subTasks(): HasMany
    {
        return $this->hasMany(Task::class, 'parent_id')->orderBy('created_at');
    }

    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable')->latest();
    }
}
