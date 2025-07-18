<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Order;
use App\Models\User;

class OrderApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_list_orders()
    {
        $user = User::factory()->create();
        Order::factory()->count(2)->create(['user_id' => $user->id]);
        $response = $this->actingAs($user, 'sanctum')->getJson('/api/orders');
        $response->assertStatus(200)->assertJsonCount(2);
    }

    public function test_guest_cannot_create_order()
    {
        $response = $this->postJson('/api/orders', [
            'user_id' => 1,
            'total' => 100,
            'status' => 'pending',
        ]);
        $response->assertStatus(401);
    }

    public function test_authenticated_user_can_create_order()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user, 'sanctum')->postJson('/api/orders', [
            'user_id' => $user->id,
            'total' => 100,
            'status' => 'pending',
        ]);
        $response->assertStatus(201)->assertJsonFragment(['status' => 'pending']);
    }

    public function test_order_validation_errors()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user, 'sanctum')->postJson('/api/orders', [
            'user_id' => null,
            'total' => -1,
            'status' => '',
        ]);
        $response->assertStatus(422);
    }

    public function test_authenticated_user_can_update_order()
    {
        $user = User::factory()->create();
        $order = Order::factory()->create(['user_id' => $user->id]);
        $response = $this->actingAs($user, 'sanctum')->putJson("/api/orders/{$order->id}", [
            'status' => 'completed',
        ]);
        $response->assertStatus(200)->assertJsonFragment(['status' => 'completed']);
    }

    public function test_authenticated_user_can_delete_order()
    {
        $user = User::factory()->create();
        $order = Order::factory()->create(['user_id' => $user->id]);
        $response = $this->actingAs($user, 'sanctum')->deleteJson("/api/orders/{$order->id}");
        $response->assertStatus(200)->assertJsonFragment(['message' => 'Order deleted']);
    }
} 