<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('task_dependencies', function (Blueprint $table) {
            $table->string('dependency_type')->default('blocking');
        });
    }

    public function down()
    {
        Schema::table('task_dependencies', function (Blueprint $table) {
            $table->dropColumn('dependency_type');
        });
    }
};
