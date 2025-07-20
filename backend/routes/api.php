<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Auth\GoogleAuthController;

// Test route
Route::get('test', function () {
    return response()->json(['message' => 'API is working!']);
});

// Health check
Route::get('health', function () {
    return response()->json(['status' => 'ok']);
});

// Public routes
Route::get('products', [ProductController::class, 'index']);
Route::get('products/{product}', [ProductController::class, 'show']);

// Authentication
Route::post('register', [RegisterController::class, 'register']);
Route::post('login', [LoginController::class, 'login']);
Route::post('logout', [LogoutController::class, 'logout'])->middleware('auth:sanctum');

// Google Authentication
Route::get('auth/google', [GoogleAuthController::class, 'redirectToGoogle']);
Route::get('auth/google/callback', [GoogleAuthController::class, 'handleGoogleCallback']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('products', [ProductController::class, 'store']);
    Route::put('products/{product}', [ProductController::class, 'update']);
    Route::delete('products/{product}', [ProductController::class, 'destroy']);
    Route::apiResource('users', UserController::class);
    Route::apiResource('orders', OrderController::class);
});

// Admin-only route example
Route::middleware(['auth:sanctum', 'admin'])->get('admin/dashboard', function () {
    return response()->json(['message' => 'Welcome, admin!']);
});

// Vendor-only route example
Route::middleware(['auth:sanctum', 'vendor'])->get('vendor/dashboard', function () {
    return response()->json(['message' => 'Welcome, vendor!']);
}); 