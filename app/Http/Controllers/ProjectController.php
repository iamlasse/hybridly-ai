<?php

namespace App\Http\Controllers;

use App\Data\ProjectData;
use App\Http\Requests\CreateProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use App\Models\Stage;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ProjectController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $projects = $user->projects()->select('id', 'name', 'description', 'status')->get();
        $collaboratingProjects = $user->collaborating_projects()->select('id', 'name', 'description', 'status')->get();

        $canCreateMoreProjects = $user->is_premium || $projects->count() < 3;

        return hybridly('Projects.Index', [
            'projects' => $projects,
            'collaboratingProjects' => $collaboratingProjects,
            'canCreateMoreProjects' => $canCreateMoreProjects,
        ]);
    }

    public function store(CreateProjectRequest $request): RedirectResponse
    {
        $user = $request->user();
        $projectCount = $user->projects()->count();

        if (!$user->is_premium && $projectCount >= 3) {
            return back()->with('error', 'Your account only allows you to add up to 3 boards. Please upgrade to add more.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|string|in:active,completed,on_hold',
        ]);

        $project = $user->projects()->create([
            ...$validated,
            'status' => $request->status ?? 'active',
            'slug' => Str::slug($request->name),
        ]);

        if ($request->has('stages')) {
            $project->stages()->createMany($request->input('stages'));
        } else {
            $project->stages()->createMany([
                ['name' => 'Pending', 'slug' => 'pending', 'order' => 1],
                ['name' => 'In Progress', 'slug' => 'in_progress', 'order' => 2],
                ['name' => 'Under Review', 'slug' => 'under_review', 'order' => 3],
                ['name' => 'Completed', 'slug' => 'completed', 'order' => 4],
            ]);
        }

        return back()->with('success', 'Project created successfully.');
    }

    public function show(Project $project)
    {
        $data = ProjectData::from($project->loadMissing([
            'collaborators' => function ($query) {
                $query->whereNot('collaborator_id', auth()->id());
            },
            'stages' => function ($query) {
                $query->orderBy('order');
            },
            'tasks' => function ($query) {
                $query->withCount('comments')->orderBy('status')->orderBy('order');
            },
        ]));

        return hybridly('Projects.Show', [
            'project' => $data,
            'users' => User::get()->except(auth()->id()),
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|string|in:active,completed,on_hold',
        ]);

        $project->update($validated);

        return back()->with('success', 'Project updated successfully.');
    }

    public function updateStatus(Request $request, Project $project)
    {
        $project->update(['status' => $request->status]);

        return back()->with('success', 'Project status updated successfully.');
    }

    public function addCollaborator(Request $request, Project $project)
    {
        $userIds = $project->collaborators()->pluck('collaborator_id')->toArray();

        $request->validate([
            'user_id' => ['required', 'exists:users,id', Rule::notIn($userIds)],
        ], [
            'user_id.not_in' => 'The selected user is already a collaborator.',
        ]);

        $project->collaborators()->attach($request->user_id);

        return back()->with('success', 'Collaborator added successfully.');
    }

    public function addStage(Request $request, Project $project)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $slug = Str::slug($validated['name']);
        $order = $project->stages()->max('order') + 1;

        $stage = $project->stages()->create([
            'name' => $validated['name'],
            'slug' => $slug,
            'order' => $order,
        ]);

        return back()->with('success', 'Stage added successfully.');
    }

    public function destroyStage(Project $project, Stage $stage)
    {
        DB::transaction(function () use ($project, $stage) {
            $project->stages()->where('slug', $stage->slug)->delete();

            $project->tasks()->where('status', $stage->slug)->update(['status' => 'pending']);
        });

        return back()->with('success', 'Stage deleted successfully.');
    }

    public function updateStagesOrder(Request $request, Project $project)
    {
        collect($request->columns)->each(function ($column) use ($project) {
            $project->stages()->where('slug', $column['id'])->update(['order' => $column['order'] + 1]);
        });

        return back()->with('success', 'Stages order updated successfully.');
    }
}
