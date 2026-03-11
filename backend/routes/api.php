<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProducerController;

Route::prefix('v1')->group(function () {
    Route::apiResource('producers', ProducerController::class);
});

Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});
