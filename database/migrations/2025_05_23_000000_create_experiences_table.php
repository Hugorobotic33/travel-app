<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('desc');
            $table->date('available_date');
            $table->date('expiration_date');
            $table->decimal('price', 8, 2);
            $table->float('rating', 2, 1)->nullable();
            $table->boolean('status')->default(true);
            $table->string('place')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('experiences');
    }
};
