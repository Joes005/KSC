<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SiteDataController;
use App\Http\Controllers\Api\EnquiryController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/site-data', [SiteDataController::class, 'index']);
Route::post('/contact', [EnquiryController::class, 'store']);
