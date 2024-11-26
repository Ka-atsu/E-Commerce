<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();  // Auto-incrementing primary key
            $table->string('name')->unique();  // Name, unique field
            $table->string('email')->unique();  // Email, unique field
            $table->string('password');  // Password field
            $table->string('contact');  // Contact information field
            $table->string('role');  // Address field
            $table->timestamps();  // Timestamps for created_at an
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
