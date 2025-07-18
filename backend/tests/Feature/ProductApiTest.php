<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Product;
use App\Models\User;

class ProductApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_list_products()
    {
        $user = User::factory()->create();
        Product::factory()->count(3)->create();

        $response = $this->actingAs($user, 'sanctum')->getJson('/api/products');
        $response->assertStatus(200)
                 ->assertJsonCount(3);
    }

    public function test_guest_cannot_create_product()
    {
        $response = $this->postJson('/api/products', [
            'name' => 'Test Product',
            'price' => 10,
            'stock' => 5,
        ]);
        $response->assertStatus(401);
    }

    public function test_authenticated_user_can_create_product()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user, 'sanctum')->postJson('/api/products', [
            'name' => 'Test Product',
            'price' => 10,
            'stock' => 5,
        ]);
        $response->assertStatus(201)
                 ->assertJsonFragment(['name' => 'Test Product']);
    }

    public function test_product_validation_errors()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user, 'sanctum')->postJson('/api/products', [
            'name' => '',
            'price' => -1,
            'stock' => -5,
        ]);
        $response->assertStatus(422);
    }

    public function test_authenticated_user_can_update_product()
    {
        $user = User::factory()->create();
        $product = Product::factory()->create();
        $response = $this->actingAs($user, 'sanctum')->putJson("/api/products/{$product->id}", [
            'name' => 'Updated Name',
        ]);
        $response->assertStatus(200)->assertJsonFragment(['name' => 'Updated Name']);
    }

    public function test_authenticated_user_can_delete_product()
    {
        $user = User::factory()->create();
        $product = Product::factory()->create();
        $response = $this->actingAs($user, 'sanctum')->deleteJson("/api/products/{$product->id}");
        $response->assertStatus(200)->assertJsonFragment(['message' => 'Product deleted']);
    }
} 