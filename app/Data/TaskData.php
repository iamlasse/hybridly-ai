<?php

namespace App\Data;

use App\Models\Task;
use Hybridly\Support\Data\DataResource;
use Illuminate\Database\Eloquent\Collection;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\MapOutputName;

class TaskData extends DataResource
{
    public static array $authorizations = [];

    public function __construct(
        public readonly ?int $id,
        public readonly string $title,
        public readonly ?string $description,
        public readonly ?string $slug,
        public readonly ?string $status,
        public readonly ?ProjectData $project,
        public readonly ?Collection $comments,
        #[MapOutputName('sub_tasks')]
        public readonly ?Collection $subTasks,
        #[MapName('comments_count')]
        #[MapOutputName('comments_count')]
        public readonly ?int $commentsCount,
        public int $order
    ) {}
}
