<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SiteSetting;
use App\Models\NewsEvent;
use App\Models\Facility;
use App\Models\GalleryImage;
use App\Models\Branch;
use App\Models\PageContent;
use App\Models\University;

use App\Models\UserUpdatePoster;

class SiteDataController extends Controller
{
    public function index()
    {
        $pages = PageContent::all()->groupBy('page_slug')->mapWithKeys(function ($sections, $pageSlug) {
            $sections = $sections->mapWithKeys(function ($section) {
                $content = $section->content;
                return [$section->section_key => is_string($content) ? json_decode($content, true) : $content];
            });
            return [$pageSlug => $sections];
        });

        $settings = SiteSetting::all()->mapWithKeys(function ($setting) {
            $value = $setting->value;
            if (is_string($value) && in_array(substr(trim($value), 0, 1), ['[', '{'], true)) {
                $decoded = json_decode($value, true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $value = $decoded;
                }
            }
            return [$setting->key => $value];
        });

        return response()->json([
            'settings' => $settings,
            'news_events' => NewsEvent::where('is_active', true)->orderByDesc('created_at')->get(),
            'facilities' => Facility::orderBy('id')->get(),
            'gallery_images' => GalleryImage::orderBy('sort_order')->get(),
            'branches' => Branch::orderBy('sort_order')->get(),
            'universities' => University::with(['categories.programmes'])->get(),
            'user_update_posters' => UserUpdatePoster::where('is_active', true)->orderBy('sort_order')->get(),
            'pages' => $pages,
        ]);
    }
}