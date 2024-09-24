<?php

namespace App\Http\Controllers;

use App\Data\TaskData;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Project $project)
    {
        $user = $request->user();
        $taskCount = $project->tasks()->where('status', $request->input('status'))->count();

        if (!$user->is_premium && $taskCount >= 5) {
            return back()->with('error', 'Your account only allows you to add up to 5 tasks per stage. Please upgrade to add more.');
        }

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
        $task->loadMissing(['comments.user', 'subTasks']);
        return view('Tasks.Show', [
            'task' => $task,
            'comments' => fn() => $task->comments,
            'sub_tasks' => $task->subTasks()->select('id', 'title')->get()
        ])
            ->base('projects.show', $task->project, force: true, keep: false);
    }

    public function update(Request $request, Project $project, Task $task): RedirectResponse
    {
        $request->validate([
            'status' => 'sometimes|string|in:todo,in-progress,review,complete',
            'order' => 'sometimes|integer',
            'title' => ['sometimes', 'string']
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

    public function updateTask(Request $request, Task $task)
    {
        $data = collect($request->validate([
            'title' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'subtasks' => ['nullable', 'array'],
        ]));


        // if (isset($data['description'])) {
        //     $data['description'] = json_decode($data['description']);
        // }

        if ($subtasks = data_get($data,'subtasks')) {
            collect($subtasks)->each(function ($value, $key) use ($task) {
                $task->subTasks()->create(['title' => $value, 'project_id' => $task->project_id]);
            });
        }

        ds('here', $data);

        $task->update($data->only('title', 'description')->toArray());

        return back()->with('success','Task updated');
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
