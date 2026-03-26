<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('site_config', function (Blueprint $table) {
            $table->text('gemini_api_key')->nullable()->after('tracking_api_url');
            $table->string('gemini_model', 64)->default('gemini-1.5-flash')->after('gemini_api_key');
            $table->text('gemini_system_instruction')->nullable()->after('gemini_model');
            $table->boolean('gemini_enabled')->default(true)->after('gemini_system_instruction');
        });
    }

    public function down(): void
    {
        Schema::table('site_config', function (Blueprint $table) {
            $table->dropColumn([
                'gemini_api_key',
                'gemini_model',
                'gemini_system_instruction',
                'gemini_enabled',
            ]);
        });
    }
};
