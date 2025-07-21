<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class UserApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_user_can_list_users()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        User::factory()->count(2)->create();
        $response = $this->actingAs($admin, 'sanctum')->getJson('/api/users');
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

    public function test_admin_user_can_create_user()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $response = $this->actingAs($admin, 'sanctum')->postJson('/api/users', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);
        $response->assertStatus(201)->assertJsonFragment(['name' => 'Test User']);
    }

    public function test_user_validation_errors()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $response = $this->actingAs($admin, 'sanctum')->postJson('/api/users', [
            'name' => '',
            'email' => 'not-an-email',
            'password' => 'short',
            'password_confirmation' => 'mismatch',
        ]);
        $response->assertStatus(422);
    }

    public function test_admin_user_can_update_user()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $user = User::factory()->create();
        $response = $this->actingAs($admin, 'sanctum')->putJson("/api/users/{$user->id}", [
            'name' => 'Updated User',
        ]);
        $response->assertStatus(200)->assertJsonFragment(['name' => 'Updated User']);
    }

    public function test_admin_user_can_delete_user()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $user = User::factory()->create();
        $response = $this->actingAs($admin, 'sanctum')->deleteJson("/api/users/{$user->id}");
        $response->assertStatus(200)->assertJsonFragment(['message' => 'User deleted']);
    }

    public function test_non_admin_user_cannot_access_user_management()
    {
        $user = User::factory()->create(['role' => 'user']);
        $targetUser = User::factory()->create();
        
        // Test that non-admin cannot list users
        $response = $this->actingAs($user, 'sanctum')->getJson('/api/users');
        $response->assertStatus(403);
        
        // Test that non-admin cannot create users
        $response = $this->actingAs($user, 'sanctum')->postJson('/api/users', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);
        $response->assertStatus(403);
        
        // Test that non-admin cannot update users
        $response = $this->actingAs($user, 'sanctum')->putJson("/api/users/{$targetUser->id}", [
            'name' => 'Updated User',
        ]);
        $response->assertStatus(403);
        
        // Test that non-admin cannot delete users
        $response = $this->actingAs($user, 'sanctum')->deleteJson("/api/users/{$targetUser->id}");
        $response->assertStatus(403);
    }
} 