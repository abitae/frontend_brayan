<?php

use App\Models\SiteConfig;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('site_config', function (Blueprint $table) {
            $table->string('about_title_prefix', 500)->nullable()->after('openai_enabled');
            $table->string('about_title_highlight', 120)->nullable();
            $table->string('about_title_suffix', 120)->nullable();
            $table->text('about_paragraph_1')->nullable();
            $table->text('about_paragraph_2')->nullable();
            $table->text('about_image_url')->nullable();
            $table->string('agencies_intro_title', 255)->nullable();
            $table->string('agencies_intro_subtitle', 500)->nullable();
            $table->string('agencies_cta_title', 255)->nullable();
            $table->text('agencies_cta_text')->nullable();
            $table->string('agencies_cta_button_label', 120)->nullable();
            $table->json('agencies_list')->nullable();
        });

        $about = SiteConfig::defaultAboutContent();
        $agenciesCopy = SiteConfig::defaultAgenciesPageCopy();

        DB::table('site_config')->where('id', 'default')->update([
            ...$about,
            ...$agenciesCopy,
            'agencies_list' => json_encode(SiteConfig::defaultAgenciesList()),
        ]);
    }

    public function down(): void
    {
        Schema::table('site_config', function (Blueprint $table) {
            $table->dropColumn([
                'about_title_prefix',
                'about_title_highlight',
                'about_title_suffix',
                'about_paragraph_1',
                'about_paragraph_2',
                'about_image_url',
                'agencies_intro_title',
                'agencies_intro_subtitle',
                'agencies_cta_title',
                'agencies_cta_text',
                'agencies_cta_button_label',
                'agencies_list',
            ]);
        });
    }
};
