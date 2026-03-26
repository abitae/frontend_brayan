<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pricing_routes', function (Blueprint $table) {
            $table->id();
            $table->string('origin', 100);
            $table->string('destination', 100);
            $table->decimal('base_fee', 10, 2)->default(0);
            $table->decimal('price_per_kg', 10, 4);
            $table->unsignedInteger('volumetric_factor')->default(5000);
            $table->timestamps();

            $table->unique(['origin', 'destination']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pricing_routes');
    }
};
