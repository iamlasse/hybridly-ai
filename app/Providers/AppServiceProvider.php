<?php

namespace App\Providers;

use App\Models\Task;
use App\Models\User;
use App\Models\Comment;
use App\Models\Project;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Vite;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Http\HtmlDumper;
use Illuminate\Foundation\Console\CliDumper;
use Illuminate\Database\Eloquent\Relations\Relation;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        HtmlDumper::dontIncludeSource();
        CliDumper::dontIncludeSource();
        Validator::excludeUnvalidatedArrayKeys();
        Model::shouldBeStrict();
        Model::unguard();

        Date::use(CarbonImmutable::class);

        Relation::morphMap([
            'user' => User::class,
            'task' => Task::class,
            'comment' => Comment::class,
            'project' => Project::class,
        ]);
    }
}
