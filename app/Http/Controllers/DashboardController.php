<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{

    public function index()
    {
        $projects = auth()->user()->projects()->with([
            'tasks',

        ])->withCount('tasks')->latest()->paginate(15);

        $collaboratingProjects = auth()->user()->collaborating_projects()->withCount('tasks')->latest()->paginate();

        return hybridly('dashboard', [
            'projects' => $projects,
            'collaborating_projects' => $collaboratingProjects
        ]);
    }

}
