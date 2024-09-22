<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Tests\TestCase;
use Laravel\Cashier\Subscription;
use PHPUnit\Framework\Attributes\Test;



class UserSubscriptionTest extends TestCase
{
    use LazilyRefreshDatabase;

    #[Test]
    public function user_is_not_premium_without_active_subscription()
    {
        $user = User::factory()->create(['is_premium' => false]);
        $this->assertFalse($user->is_premium);
    }

    #[Test]
    public function user_is_premium_with_active_subscription()
    {
        $user = User::factory()->create(['is_premium' => false]);

        // Create an active subscription for the user
        $subscription = new Subscription([
            'type' => 'premium',
            'stripe_status' => 'active',
            'stripe_id' => 'sub_1Q1R1OBu5sNug6D6ND9sqJCq'
        ]);

        $user->subscriptions()->save($subscription);

        $user->save();

        // Refresh the user model
        $user->refresh();

        $this->assertTrue($user->is_premium);
    }

    #[Test]
    public function user_is_not_premium_with_cancelled_subscription()
    {
        $user = User::factory()->create(['is_premium' => true]);

        // Create a cancelled subscription for the user
        $subscription = new Subscription([
            'type' => 'premium',
            'stripe_status' => 'canceled',
            'stripe_id' => 'sub_1Q1R1OBu5sNug6D6ND9sqJCq'
        ]);
        $user->subscriptions()->save($subscription);

        $user->save();
        // Refresh the user model
        $user->refresh();

        $this->assertFalse($user->is_premium);
    }

    #[Test]
    public function upgrade_process_sets_user_to_premium()
    {
        $user = User::factory()->create(['is_premium' => false]);

        // Simulate the upgrade process
        $user->newSubscription('premium', config('services.stripe.premium_price_id'))
            ->create('pm_card_visa'); // Use a test payment method

        $user->save();
        // Refresh the user model
        $user->refresh();

        $this->assertTrue($user->is_premium);
    }
}
