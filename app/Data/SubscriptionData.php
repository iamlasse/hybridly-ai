<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class SubscriptionData extends Data
{
    public function __construct(
        public string $id,
        public ?string $name,
        public ?string $description,
        public ?string $status,
        public ?string $created_at,
        public ?string $updated_at,
        public ?string $ends_at,
    ) {
    }
}
