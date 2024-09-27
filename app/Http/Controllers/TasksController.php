<?php

namespace App\Http\Controllers;

use App\Data\TaskData;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Validation\Rule;

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
        $task->loadMissing(['comments.user', 'subTasks', 'assignedTo', 'dependencies']);
        $users = User::all();
        return view('Tasks.Show', [
            'task' => $task,
            'tasks' => $task->project->tasks,
            'project' => $task->project->loadMissing('stages'),
            'comments' => fn() => $task->comments,
            'sub_tasks' => $task->subTasks()->select(['id', 'title', 'completed', 'completed_at'])->get(),
            'users' => $users,
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
            'due_date' => ['nullable', 'date'],
            'assigned_to_id' => ['nullable', 'exists:users,id'],
            'status' => ['nullable', 'string', 'exists:stages,slug', Rule::in($task->project->stages->pluck('slug'))]
        ]));

        if ($subtasks = data_get($data, 'subtasks')) {
            collect($subtasks)->each(function ($value, $key) use ($task) {
                $task->subTasks()->create(['title' => $value]);
            });
        }

        $updateData = $data->only('title', 'description', 'assigned_to_id')->toArray();

        // Handle due_date separately
        if ($request->has('due_date')) {
            $updateData['due_date'] = $request->input('due_date') === false ? null : $request->input('due_date');
        }

        if($request->has('status')) {
            $updateData['status'] = $request->status;
        }

        $task->update($updateData);

        return back()->with('success', 'Task updated');
    }

    public function assignTask(Request $request, Task $task)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $task->update(['assigned_to_id' => $request->user_id]);

        return back()->with('success', 'Task assigned successfully');
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

    public function destroy(Task $task)
    {
        $task->delete();

        return back()->with('success', 'Task deleted');
    }

    public function completeSubtask(Request $request, Task $task)
    {
        // Check if the authenticated user owns the task
        if ($task->project->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Complete the subtask
        $task->completed_at = now();
        $task->save();

        return back()->with('success', 'Task completed successfully');
    }

    public function toggleCompletion(Task $task)
    {
        if ($task->completed_at) {
            $task->completed_at = null;
            $task->completed = false;
        } else {
            $task->completed_at = now();
            $task->completed = true;
        }
        $task->save();

        return back()->with('success', 'Task completed status updated successfully');
    }

    public function addDependency(Request $request, Task $task)
    {
        $data = $request->validate([
            'dependency_id' => ['required', 'exists:tasks,id', Rule::in($task->project->tasks->pluck('id'))],
            'type' => ['nullable', 'in:is_blocking,blocked_by']
        ]);

        // Prevent adding the task as its own dependency
        if ($data['dependency_id'] == $task->id) {
            return back()->with('error', 'A task cannot depend on itself.');
        }

        // Prevent circular dependencies
        if ($this->wouldCreateCircularDependency($task, $data['dependency_id'])) {
            return back()->with('error', 'Adding this dependency would create a circular reference.');
        }

        $dependencies = $task->dependencies->pluck('id');

        $task->dependencies()->detach($data['dependency_id']);
        $task->dependencies()->attach($data['dependency_id'], ['dependency_type' => data_get($data,'type')]);

        return back()->with('success', 'Dependency added successfully');
    }

    private function wouldCreateCircularDependency(Task $task, $newDependencyId, $visited = [])
    {
        if (in_array($task->id, $visited)) {
            return true;
        }

        $visited[] = $task->id;

        if ($task->id == $newDependencyId) {
            return true;
        }

        foreach ($task->dependencies as $dependency) {
            if ($this->wouldCreateCircularDependency($dependency, $newDependencyId, $visited)) {
                return true;
            }
        }

        return false;
    }

    public function removeDependency(Request $request, Task $task)
    {
        $request->validate([
            'dependency_id' => 'required|exists:tasks,id',
        ]);

        $task->dependencies()->detach($request->dependency_id);

        return back()->with('success', 'Dependency removed successfully');
    }
}
