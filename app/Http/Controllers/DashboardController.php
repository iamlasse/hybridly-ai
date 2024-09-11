<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{

    public function index()
    {
        return hybridly('dashboard', [
            'projects' => auth()->user()->projects()->with([
                'tasks',

            ])->withCount('tasks')->latest()->paginate(6)
        ]);
    }

}
