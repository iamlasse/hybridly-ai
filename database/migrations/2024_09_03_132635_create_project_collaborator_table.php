<?php

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("project_collaborators", function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Project::class)->onDelete("cascade");
            $table
                ->foreignIdFor(User::class, 'collaborator_id')
                ->onDelete("cascade");
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists("project_collaborators");
    }
};
