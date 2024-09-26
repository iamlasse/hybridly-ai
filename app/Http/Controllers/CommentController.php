<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'body' => ['required', 'json'],
            'commentable_id' => 'required',
            'commentable_type' => 'required|in:task,project',
        ]);


        $commentableType = data_get($data, 'commentable_type');
        $commentableId = data_get($data, 'commentable_id');

        $commentable = $commentableType === 'task'
            ? Task::findOrFail($commentableId)
            : Project::findOrFail($commentableId);

        $comment = new Comment;
        $comment->body = $data['body'];
        $comment->user_id = auth()->id();

        $commentable->comments()->save($comment);

        return back();
    }
}
