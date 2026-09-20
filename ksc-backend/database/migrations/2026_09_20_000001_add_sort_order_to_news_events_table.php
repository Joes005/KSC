<?php

use App\Models\NewsEvent;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('news_events', function (Blueprint $table) {
            $table->integer('sort_order')->default(0)->after('link');
        });

        // Preserve the current display order (newest-first, matching the old
        // orderByDesc('created_at')) as the initial sort_order values.
        NewsEvent::orderByDesc('created_at')->get()->each(function (NewsEvent $newsEvent, int $index) {
            $newsEvent->update(['sort_order' => $index]);
        });
    }

    public function down(): void
    {
        Schema::table('news_events', function (Blueprint $table) {
            $table->dropColumn('sort_order');
        });
    }
};
