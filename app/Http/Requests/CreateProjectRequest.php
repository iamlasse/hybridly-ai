<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class CreateProjectRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            "name" => ["required", "string"],
            "description" => ["sometimes", "string"],
            "status" => ["nullable", "string"],
            "collaborators" => ["array"],
        ];
    }

    public function authorize(): bool
    {
        return true;
        // return Gate::allows("create-project");
    }
}
