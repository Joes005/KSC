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

        return response()->json([
            'settings' => SiteSetting::pluck('value', 'key'),
            'news_events' => NewsEvent::where('is_active', true)->orderByDesc('created_at')->get(),
            'facilities' => Facility::orderBy('id')->get(),
            'gallery_images' => GalleryImage::orderBy('sort_order')->get(),
            'branches' => Branch::orderBy('sort_order')->get(),
            'universities' => University::with(['categories.programmes'])->get(),
            'pages' => $pages,
        ]);
    }
}