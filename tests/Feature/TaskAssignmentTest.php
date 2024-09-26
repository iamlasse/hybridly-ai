<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskAssignmentTest extends TestCase
{
    use RefreshDatabase;

    protected Task $task;
    protected ?Collection $users;

    public function setUp(): void
    {
        parent::setUp();
        $this->task = Task::factory()->create();
        $this->users = User::factory()->count(2)->create();
    }

    public function testUserCanAssignTaskToThemselves()
    {
        /** @var User $user */
        $user = $this->users[0];
        $response = $this->actingAs($user)->postJson("/tasks/{$this->task->id}/assign", [
            'user_id' => $user->id
        ]);

        $response->assertStatus(200);
        $this->assertEquals($user->id, $this->task->fresh()->assignee_id);
    }

    public function testUserCanAssignTaskToAnotherUser()
    {
        $assignee = $this->users[1];
        $response = $this->actingAs($this->users[0])->postJson("/tasks/{$this->task->id}/assign", [
            'user_id' => $assignee->id
        ]);

        $response->assertStatus(200);
        $this->assertEquals($assignee->id, $this->task->fresh()->assignee_id);
    }

    public function testUserCanUnassignTask()
    {
        $this->task->update(['assignee_id' => $this->users[0]->id]);

        $response = $this->actingAs($this->users[0])->postJson("/tasks/{$this->task->id}/unassign");

        $response->assertStatus(200);
        $this->assertNull($this->task->fresh()->assignee_id);
    }

    public function testCannotAssignTaskToNonExistentUser()
    {
        $response = $this->actingAs($this->users[0])->postJson("/tasks/{$this->task->id}/assign", [
            'user_id' => 999
        ]);

        $response->assertStatus(422);
    }

    public function testCanViewAssignedUser()
    {
        $assignee = $this->users[1];
        $this->task->update(['assignee_id' => $assignee->id]);

        $response = $this->actingAs($this->users[0])->getJson("/tasks/{$this->task->id}");

        $response->assertStatus(200)
            ->assertJsonFragment([
                'assignee' => [
                    'id' => $assignee->id,
                    'name' => $assignee->name
                ]
            ]);
    }
}
