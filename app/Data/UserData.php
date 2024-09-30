<?php

namespace App\Data;

use Carbon\CarbonInterface;
use Spatie\LaravelData\Data;

final class UserData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly string $email,
        public readonly bool $is_premium = false,
        public readonly ?string $avatar,
        public readonly ?SubscriptionData $activeSubscription,
        public readonly ?CarbonInterface $email_verified_at,
    ) {}
}
