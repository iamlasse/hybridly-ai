<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\Project;
use App\Models\Stage;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

use function Hybridly\view;

class TasksController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tasks = Task::all();

        return inertia('Tasks/Index', compact('tasks'));
    }
    /**
     * Store a newly created task in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Project $project)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|string|max:255',
        ]);

        $task = $project->tasks()->create([
            'title' => $request->input('name') ?? 'Test',
            'description' => $request->input('description'),
            'status' => $request->input('status'),
            'order' => $project->tasks()->where('status', $request->input('status'))->max('order') + 1,
        ]);

        return back()->with('success', 'Task created successfully.');
    }

    public function show(Task $task)
    {
        return view('Tasks.Show', )->properties(
            [
                'task' => $task->load(['comments.user']),
                'comments' => fn() => $task->comments
            ]
        )
            ->base('projects.show', $task->project, force: true, keep: false)
        ;
    }

    public function update(Request $request, Project $project, Task $task): RedirectResponse
    {
        $request->validate([
            'status' => 'sometimes|string|in:todo,in-progress,review,complete',
            'order' => 'sometimes|integer',
        ]);

        $updateData = [];

        if ($request->has('status')) {
            $updateData['status'] = $request->input('status');
        }

        if ($request->has('order')) {
            $updateData['order'] = $request->input('order');

            // Reorder tasks in the same status
            $tasksToUpdate = $project->tasks()
                ->where('status', $task->status)
                ->where('id', '!=', $task->id)
                ->where('order', '>=', $request->input('order'))
                ->orderBy('order')
                ->get();

            foreach ($tasksToUpdate as $index => $taskToUpdate) {
                $taskToUpdate->update(['order' => $request->input('order') + $index + 1]);
            }
        }

        $task->update($updateData);

        return back();
    }

    public function bulkUpdate(Request $request, Project $project)
    {
        $request->validate([
            'tasks' => 'required|array',
            'tasks.*.id' => 'required|integer|exists:tasks,id',
            'tasks.*.status' => 'required|string',
            'tasks.*.order' => 'required|integer',
        ]);

        DB::transaction(function () use ($request, $project) {
            foreach ($request->tasks as $taskData) {
                $task = $project->tasks()->findOrFail($taskData['id']);
                $task->update([
                    'status' => $taskData['status'],
                    'order' => $taskData['order'],
                ]);
            }
        });

        return back();
    }
}
