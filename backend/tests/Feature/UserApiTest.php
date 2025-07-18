<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class UserApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_list_users()
    {
        $user = User::factory()->create();
        User::factory()->count(2)->create();
        $response = $this->actingAs($user, 'sanctum')->getJson('/api/users');
        $response->assertStatus(200)->assertJsonCount(3);
    }

    public function test_guest_cannot_create_user()
    {
        $response = $this->postJson('/api/users', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);
        $response->assertStatus(401);
    }

    public function test_authenticated_user_can_create_user()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user, 'sanctum')->postJson('/api/users', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);
        $response->assertStatus(201)->assertJsonFragment(['name' => 'Test User']);
    }

    public function test_user_validation_errors()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user, 'sanctum')->postJson('/api/users', [
            'name' => '',
            'email' => 'not-an-email',
            'password' => 'short',
            'password_confirmation' => 'mismatch',
        ]);
        $response->assertStatus(422);
    }

    public function test_authenticated_user_can_update_user()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user, 'sanctum')->putJson("/api/users/{$user->id}", [
            'name' => 'Updated User',
        ]);
        $response->assertStatus(200)->assertJsonFragment(['name' => 'Updated User']);
    }

    public function test_authenticated_user_can_delete_user()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user, 'sanctum')->deleteJson("/api/users/{$user->id}");
        $response->assertStatus(200)->assertJsonFragment(['message' => 'User deleted']);
    }
} 