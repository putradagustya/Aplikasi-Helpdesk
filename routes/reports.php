<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReportController;

Route::post('/report.search', [ReportController::class, 'search']);
Route::post('/report.send', [ReportController::class, 'store']);

Route::middleware('auth')->group(function () {
    Route::get('/reports', [ReportController::class, 'index']);
    Route::get('/report/detail/{id}', [ReportController::class, 'show']);
    Route::get('/statistik', [ReportController::class, 'statistik']);
    Route::post('/report.update', [ReportController::class, 'updateStatus']);
});
