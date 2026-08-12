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
        return response()->json([
            'settings' => SiteSetting::pluck('value', 'key'),
            'news_events' => NewsEvent::where('is_active', true)->get(),
            'facilities' => Facility::all(),
            'gallery_images' => GalleryImage::orderBy('sort_order')->get(),
            'branches' => Branch::orderBy('sort_order')->get(),
            'universities' => University::with(['categories.programmes'])->get(),
            'pages' => PageContent::all()->groupBy('page_slug'),
        ]);
    }
}
