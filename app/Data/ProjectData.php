<?php

namespace App\Data;

use Hybridly\Support\Data\DataResource;
use Illuminate\Database\Eloquent\Collection;
use Spatie\LaravelData\Attributes\DataCollectionOf;

class ProjectData extends DataResource
{
    public static array $authorizations = [
        'addCollaborators',
    ];

    public function __construct(
        public readonly ?int $id,
        public readonly string $name,
        public readonly ?string $description,
        public readonly ?string $slug,
        public readonly ?string $status,
        public readonly ?UserData $user,
        public readonly ?Collection $stages,
        public readonly ?Collection $collaborators,
        #[DataCollectionOf(TaskData::class)]
        public readonly ?Collection $tasks,
    ) {}
}
