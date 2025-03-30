<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TicketController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('login',[AuthController::class,'login']);
Route::post('tickets/store', [TicketController::class, 'store']);
Route::get('reference/{reference}', [TicketController::class, 'reference']);
Route::post('refresh', [AuthController::class, 'refresh']);

Route::middleware(['auth:api'])->group(function(){
    Route::post('logout', [AuthController::class, 'logout']);
    Route::apiResource('tickets', TicketController::class);
    Route::put('tickets/{ticket}/read', [TicketController::class, 'ticket_read']);

});
