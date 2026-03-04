<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProducerController;

Route::prefix('v1')->group(function () {

    Route::middleware('auth:sanctum')->group(function () {

        Route::apiResource('producers', ProducerController::class);

    });

});
