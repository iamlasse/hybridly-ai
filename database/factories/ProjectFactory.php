<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'slug' => fake()->slug(),
            'description' => fake()->text(),
            'image' => fake()->imageUrl(),
            'url' => fake()->url(),
            'is_published' => fake()->boolean(),
            'user_id' => \App\Models\User::factory(),
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (Project $project) {
            $project->stages()->createMany([
                ['name' => 'Pending', 'slug' => 'pending', 'order' => 1],
                ['name' => 'In Progress', 'slug' => 'in_progress', 'order' => 2],
                ['name' => 'Under Review', 'slug' => 'under_review', 'order' => 3],
                ['name' => 'Completed', 'slug' => 'completed', 'order' => 4],
            ]);

            // $project->tasks()->createMany([
            //     ['name' => 'Task 1', 'description' => 'This is task 1', 'status' => 'pending', 'order' => 1],
            //     ['name' => 'Task 2', 'description' => 'This is task 2', 'status' => 'pending', 'order' => 2],

            //     ['name' => 'Task 2', 'description' => 'This is task 2', 'status' => 'in_progress', 'order' => 1],
            //     ['name' => 'Task 3', 'description' => 'This is task 3', 'status' => 'under_review', 'order' => 1],
            //     ['name' => 'Task 4', 'description' => 'This is task 4', 'status' => 'completed', 'order' => 1],
            // ]);
        });
    }
}
