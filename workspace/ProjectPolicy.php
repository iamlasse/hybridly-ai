<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;

class ProjectPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function addCollaborators(User $user, Project $project)
    {
        return $user->id === $project->user_id && $user->is_premium;
    }
}
