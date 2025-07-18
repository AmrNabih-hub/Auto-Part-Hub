<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class SentryTest extends TestCase
{
    use RefreshDatabase;

    public function test_sentry_configuration_is_loaded()
    {
        $this->assertTrue(config('sentry.dsn') !== null);
        $this->assertStringContainsString('sentry.io', config('sentry.dsn'));
    }

    public function test_sentry_service_is_available()
    {
        $this->assertTrue(app()->bound('sentry') || config('sentry.dsn') === null);
    }
} 