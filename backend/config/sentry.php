<?php

return [
    'dsn' => env('SENTRY_LARAVEL_DSN', 'https://4b8319d570f7e9e9f28b9e3b36534370@o4509691725479936.ingest.de.sentry.io/4509691740029008'),
    
    'traces_sample_rate' => env('SENTRY_TRACES_SAMPLE_RATE', 1.0),
    
    'profiles_sample_rate' => env('SENTRY_PROFILES_SAMPLE_RATE', 1.0),
    
    'send_default_pii' => true,
    
    'environment' => env('APP_ENV', 'production'),
    
    'before_send' => function (\Sentry\Event $event): ?\Sentry\Event {
        return $event;
    },
]; 