<?php

use App\Models\Project;
use App\Models\Task;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->foreignIdFor(Task::class, 'parent_id')->nullable();
            $table->text('description')->nullable();
            $table->boolean('completed')->default(false);
            $table->datetime('completed_at')->default(now());
            $table->foreignIdFor(Project::class);
            $table->json('stages')->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}
