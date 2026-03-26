<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('site_config', function (Blueprint $table) {
            $table->string('calculator_default_mode', 32)->nullable()->after('tracking_api_url');
            $table->unsignedInteger('calculator_default_weight')->nullable()->after('calculator_default_mode');
            $table->unsignedInteger('calculator_default_length')->nullable()->after('calculator_default_weight');
            $table->unsignedInteger('calculator_default_width')->nullable()->after('calculator_default_length');
            $table->unsignedInteger('calculator_default_height')->nullable()->after('calculator_default_width');
        });
    }

    public function down(): void
    {
        Schema::table('site_config', function (Blueprint $table) {
            $table->dropColumn([
                'calculator_default_mode',
                'calculator_default_weight',
                'calculator_default_length',
                'calculator_default_width',
                'calculator_default_height',
            ]);
        });
    }
};
