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
            $table->string('type')->default('event')->after('badge');
        });

        // Previously the notice type was inferred from the free-text badge, so
        // custom badges like "BDU EXAM RESULT" silently became "event" and were
        // dropped from the Exam Update page. Derive the type from the existing
        // badge/title so every current notice keeps showing where it belongs.
        NewsEvent::all()->each(function (NewsEvent $newsEvent) {
            $badge = strtolower(trim((string) $newsEvent->badge));
            $text = $badge.' '.strtolower((string) $newsEvent->title);

            $type = match (true) {
                in_array($badge, ['admission', 'deadline', 'exam', 'event'], true) => $badge,
                (bool) preg_match('/exam|result|hall ticket|time-?table/', $text) => 'exam',
                (bool) preg_match('/last date|deadline/', $text) => 'deadline',
                str_contains($text, 'admission') => 'admission',
                default => 'event',
            };

            $newsEvent->update(['type' => $type]);
        });
    }

    public function down(): void
    {
        Schema::table('news_events', function (Blueprint $table) {
            $table->dropColumn('type');
        });
    }
};
