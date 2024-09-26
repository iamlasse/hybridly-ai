<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperComment
 */
class Comment extends Model
{
    protected $fillable = ['body', 'commentable_id', 'commentable_type'];

    protected $appends = ['readable_created_time', 'formatted_body'];

    protected $casts = [
        'body' => 'json',
    ];

    public function commentable()
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function readableCreatedTime(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->created_at->diffForHumans()
        );
    }

    public function formattedBody(): Attribute
    {
        return Attribute::make(
            get: function () {
                return preg_replace_callback(
                    '/\[@(\w+)\]\(user:\/\/(\d+)\)/',
                    function ($matches) {
                        $user = User::find($matches[2]);
                        return $user
                            ? '<a href="/users/' . $user->id . '" class="mention">@' . $user->name . '</a>'
                            : '@' . $matches[1];
                    },
                    $this->body
                );
            }
        );
    }
}
