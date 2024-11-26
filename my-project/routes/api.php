<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\LoginController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/login', [LoginController::class, 'login']);

Route::post('/register', [LoginController::class, 'register']);

Route::post('/create_product', [ProductController::class, 'store']);

Route::get('/display_products', [ProductController::class, 'index']);

Route::get('/view_product/{id}', [ProductController::class, 'show']);

Route::put('/update_product/{id}', [ProductController::class, 'update']);

Route::delete('/delete_product/{id}', [ProductController::class, 'destroy']);
