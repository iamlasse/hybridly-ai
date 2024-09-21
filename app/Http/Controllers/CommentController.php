<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Task;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'body' => 'required',
            'commentable_id' => 'required',
            'commentable_type' => 'required|in:task,project',
        ]);

        $commentableType = $request->input('commentable_type');
        $commentableId = $request->input('commentable_id');

        $commentable = $commentableType === 'task'
            ? Task::findOrFail($commentableId)
            : Project::findOrFail($commentableId);

        $comment = new Comment;
        $comment->body = $request->input('body');
        $comment->user_id = auth()->id();

        $commentable->comments()->save($comment);

        return back();
    }
}
