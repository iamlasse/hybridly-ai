<?php

namespace App\Data;

use DateTimeInterface;
use Hybridly\Support\Data\DataResource;
use Illuminate\Database\Eloquent\Collection;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Attributes\LoadRelation;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\MapOutputName;
use Spatie\LaravelData\Optional;

class TaskData extends DataResource
{
    public static array $authorizations = [];

    public function __construct(
        public readonly int $id,
        public readonly string $title,
        public readonly ?string $description,
        public readonly ?string $slug,
        public readonly ?string $status,
        #[LoadRelation]
        #[MapOutputName('created_by')]
        public readonly ?UserData $user,
        #[MapOutputName('due_date')]
        public DateTimeInterface|string|null $due_date,
        public bool $completed,
        public ?DateTimeInterface $completed_at,
        public readonly ?ProjectData $project,
        public readonly ?Collection $comments,
        #[MapOutputName('sub_tasks')]
        public readonly ?Collection $subTasks,
        #[MapName('comments_count')]
        #[MapOutputName('comments_count')]
        public readonly ?int $commentsCount,
        public int $order,
        #[MapOutputName('assigned_to')]
        public readonly ?UserData $assignedTo,
        #[MapOutputName('dependencies')]
        #[DataCollectionOf(TaskData::class)]
        public readonly Optional|Collection $dependencies,
    ) {}

    // public static function normalizers(): array
    // {
    //     return [
    //         ...config('data.normalizers'),

    //     ];
    // }
}
