<?php

namespace App\Http\Controllers;

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
            'collaborating_projects' => $collaboratingProjects,
        ]);
    }
}
