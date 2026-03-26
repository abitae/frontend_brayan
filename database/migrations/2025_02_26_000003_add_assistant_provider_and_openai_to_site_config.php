<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('site_config', function (Blueprint $table) {
            $table->string('assistant_provider', 32)->default('gemini')->after('gemini_enabled');
            $table->string('openai_api_key', 500)->nullable()->after('assistant_provider');
            $table->string('openai_model', 64)->nullable()->after('openai_api_key');
            $table->text('openai_system_instruction')->nullable()->after('openai_model');
            $table->boolean('openai_enabled')->default(true)->after('openai_system_instruction');
        });
    }

    public function down(): void
    {
        Schema::table('site_config', function (Blueprint $table) {
            $table->dropColumn([
                'assistant_provider',
                'openai_api_key',
                'openai_model',
                'openai_system_instruction',
                'openai_enabled',
            ]);
        });
    }
};
