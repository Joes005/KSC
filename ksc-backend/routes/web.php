<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/linkstorage', function () {
    try {
        Artisan::call('storage:link');
        return response()->json([
            'status' => 'success',
            'message' => 'The storage symlink has been created successfully.',
            'output' => trim(Artisan::output()),
        ]);
    } catch (\Throwable $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage(),
        ], 500);
    }
});

Route::get('/storage/{path}', function ($path) {
    $path = ltrim($path, '/');
    $clean = str_replace(['..', '\\'], ['', '/'], $path);
    $fullPath = storage_path('app/public/' . $clean);

    if (!is_file($fullPath)) {
        abort(404);
    }

    return response()->file($fullPath, [
        'Access-Control-Allow-Origin' => '*',
        'Cache-Control' => 'public, max-age=31536000',
    ]);
})->where('path', '.*');
