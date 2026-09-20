<?php

use App\Models\SiteSetting;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        if (SiteSetting::where('key', 'nav.previous_question_links')->exists()) {
            return;
        }

        SiteSetting::create([
            'key' => 'nav.previous_question_links',
            'value' => json_encode([
                ['label' => 'Alagappa University', 'url' => '#'],
                ['label' => 'Bharathidasan University', 'url' => '#'],
                ['label' => 'Tamil Nadu Open University', 'url' => '#'],
                ['label' => 'Manonmaniam Sundaranar University', 'url' => '#'],
            ]),
        ]);
    }

    public function down(): void
    {
        SiteSetting::where('key', 'nav.previous_question_links')->delete();
    }
};
