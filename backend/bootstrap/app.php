<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->api(prepend: [
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ]);
        
        $middleware->alias([
            'admin' => \App\Http\Middleware\AdminMiddleware::class,
            'vendor' => \App\Http\Middleware\VendorMiddleware::class,
        ]);
    })

    ->withExceptions(function (Exceptions $exceptions) {
        // Register Sentry for error reporting
        if (app()->environment('production')) {
            $exceptions->reportable(function (\Throwable $e) {
                if (app()->bound('sentry')) {
                    app('sentry')->captureException($e);
                }
            });
        }
    })->create();

RateLimiter::for('api', function (Request $request) {
    return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
});

