<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;

/**
 * @mixin IdeHelperUser
 */
class User extends Authenticatable
{
    use HasFactory, Notifiable, Billable;

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'is_premium' => 'boolean',
    ];



    protected static function booted(): void
    {
        static::created(function (User $user) {
            $user->updatePremiumStatus();
        });

        static::updated(function (User $user) {
            $user->updatePremiumStatus();
        });

        static::saved(function (User $user) {
            $user->updatePremiumStatus();
        });
    }

    public function activeSubscription(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->subscriptions()->where('type', 'premium')->where('stripe_status', 'active')->first(),
        );
    }

    public function updatePremiumStatus()
    {
        $hasActiveSubscription = $this->subscriptions()
            ->where('stripe_status', 'active')
            ->exists();

        $this->is_premium = $hasActiveSubscription;
        $this->saveQuietly();
    }

    public function updatePlan(string $plan){
        $this->is_premium = $plan === 'premium';
        $this->saveQuietly();
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_premium',
        'stripe_id',
        'pm_type',
        'pm_last_four',
        'trial_ends_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    public function collaborating_projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class, 'project_collaborators', 'collaborator_id', 'project_id');
    }
}
