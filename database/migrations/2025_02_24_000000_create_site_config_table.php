<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('site_config', function (Blueprint $table) {
            $table->string('id', 32)->primary();
            $table->string('company_name');
            $table->string('logo_text');
            $table->string('hero_title');
            $table->string('hero_subtitle', 500);
            $table->string('primary_color', 20);
            $table->text('logo_url')->nullable();
            $table->text('banner_url')->nullable();
            $table->text('banner_bg_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_config');
    }
};
