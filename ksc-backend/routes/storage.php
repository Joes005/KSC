<?php

use Illuminate\Support\Facades\Route;

// Serve admin-uploaded files from storage/app/public. On Hostinger the
// public/storage symlink is unreliable, so Laravel serves them directly;
// when a working symlink exists Apache serves the file and never gets here.
// Registered outside the "web" group so images don't start a DB session.
Route::get('/storage/{path}', function (string $path) {
    $root = realpath(storage_path('app/public'));
    $fullPath = $root ? realpath($root.DIRECTORY_SEPARATOR.$path) : false;

    abort_unless(
        $fullPath && str_starts_with($fullPath, $root.DIRECTORY_SEPARATOR) && is_file($fullPath),
        404
    );

    return response()->file($fullPath, [
        'Access-Control-Allow-Origin' => '*',
        'Cache-Control' => 'public, max-age=31536000',
    ]);
})->where('path', '.*')->name('storage.public');
