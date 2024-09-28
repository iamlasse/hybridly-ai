<?php



use App\Http\Controllers\BillingController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TasksController;
use App\Http\Controllers\UpgradeController;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return hybridly('LandingPage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => phpversion(),
    ]);
})->name('home');


Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/billing', [BillingController::class, 'show'])->name('billing.show');
    Route::put('/billing/cancel-subscription', [BillingController::class, 'cancelSubscription'])->name('billing.cancel-subscription');
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

// New routes for tasks and projects
Route::resource('projects', ProjectController::class)->only(['index', 'store', 'update', 'show'])
    ->middleware(['auth:sanctum'])
    ->names([
        'index' => 'projects.index',
        'store' => 'projects.store',
        'update' => 'projects.update',
        'show' => 'projects.show',
    ]);

Route::post('/projects/{project}/stages', [ProjectController::class, 'addStage'])
    ->middleware(['auth:sanctum'])
    ->name('projects.stages.store');

Route::delete('/projects/{project}/stages/{stage:slug}', [ProjectController::class, 'destroyStage'])
    ->middleware(['auth:sanctum'])
    ->name('projects.stages.destroy');

Route::put('/projects/{project}/status', [ProjectController::class, 'updateStatus'])
    ->middleware(['auth:sanctum'])
    ->name('projects.update-status');

Route::put('/projects/{project}/tasks', [TasksController::class, 'store'])
    ->middleware(['auth:sanctum'])
    ->name('projects.tasks.store');

Route::put('/projects/{project}/tasks', [TasksController::class, 'store'])->middleware(['auth:sanctum'])->name('projects.tasks.store');

Route::put('/projects/{project}/tasks/bulk-update', [TasksController::class, 'bulkUpdate'])
    ->middleware(['auth:sanctum'])
    ->name('projects.tasks.bulk-update');

Route::put('/projects/{project}/tasks/{task:id}', [TasksController::class, 'update'])
    ->middleware(['auth:sanctum'])
    ->name('projects.tasks.update');

Route::put('/tasks/{task:id}', [TasksController::class, 'updateTask'])->name('tasks.update');
Route::put('/tasks/{task:id}/assign', [TasksController::class, 'assignTask'])->name('tasks.assign');
Route::delete('/tasks/{task:id}', [TasksController::class, 'destroy'])->name('tasks.destroy');

Route::put('/projects/{project}/collaborators', [ProjectController::class, 'addCollaborator'])
    ->middleware(['auth:sanctum'])
    ->name('projects.collaborators.store');
Route::put('/projects/{project}/collaborators', [ProjectController::class, 'addCollaborator'])->middleware(['auth:sanctum', HandlePrecognitiveRequests::class])->name('projects.collaborators.store');

// New route for updating column order
Route::post('/projects/{project}/stages/update-order', [ProjectController::class, 'updateStagesOrder'])
    ->middleware(['auth:sanctum'])
    ->name('projects.stages.updateOrder');

Route::get('/tasks', [TasksController::class, 'index'])->middleware(['auth:sanctum'])->name('tasks.index');
Route::get('/tasks/{task}', [TasksController::class, 'show'])->middleware(['auth:sanctum'])->name('tasks.show');

Route::post('/task/{task:id}/comment', [CommentController::class, 'store'])->name('task.comments.store');

Route::put('/tasks/{task:id}/add-dependency', [TasksController::class, 'addDependency'])->name('tasks.add-dependency');
Route::put('/tasks/{task:id}/update-dependency', [TasksController::class, 'updateDependency'])->name('tasks.update-dependency');
Route::put('/tasks/{task:id}/remove-dependency', [TasksController::class, 'removeDependency'])->name('tasks.remove-dependency');


Route::middleware(['auth:sanctum'])->as('upgrade.')->group(function () {
    Route::get('/upgrade/options', [UpgradeController::class, 'show'])->name('show');
    Route::post('/upgrade/process', [UpgradeController::class, 'process'])->name('process');
    Route::get('/upgrade/checkout', [UpgradeController::class, 'checkout'])->name('checkout');
});

Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

require __DIR__ . '/auth.php';

Route::post('/tasks/{task:id}/complete', [TasksController::class, 'completeSubtask'])
    ->name('tasks.complete')
    ->middleware(['auth']);

Route::post('/tasks/{task}/toggle-completion', [TasksController::class, 'toggleCompletion'])
    ->name('tasks.toggle-completion')
    ->middleware(['auth']);
