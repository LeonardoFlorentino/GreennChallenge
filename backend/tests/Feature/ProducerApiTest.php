<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Producer;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProducerApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_producers()
    {
        Producer::factory()->count(3)->create();

        $response = $this->getJson('/api/v1/producers');

        $response->assertStatus(200)
                 ->assertJsonCount(3)
                 ->assertJsonStructure([
                     '*' => ['id', 'name', 'relevance_score'],
                 ]);
    }

    public function test_can_create_producer()
    {
        $data = [
            'name' => 'Rhuan Cavalcante',
            'email' => 'rhuan@test.com',
            'document' => '12345678900',
            'status' => 'active',
            'commission' => 60,
            'imageUrl' => 'https://image.com/img.jpg',
            'followers_instagram' => 100000,
            'is_trending' => false,
            'category' => 'Marketing Digital',
            'direct_sales_last_year' => 19500000,
            'indirect_sales_last_year' => 13400000,
            'direct_sales_last_month' => 720000,
            'indirect_sales_last_month' => 450000,
            'last_sale_value' => 185000,
            'relevance_score' => 99.9,
        ];

        $expectedScore = (new Producer($data))->relevance_score;

        $response = $this->postJson('/api/v1/producers', $data);

        $response->assertStatus(201)
                 ->assertJsonFragment([
                     'name' => 'Rhuan Cavalcante'
                 ])
                 ->assertJsonPath('relevance_score', $expectedScore);

        $this->assertDatabaseHas('producers', [
            'email' => 'rhuan@test.com'
        ]);
    }

    public function test_can_show_producer()
    {
        $producer = Producer::factory()->create();

        $response = $this->getJson("/api/v1/producers/{$producer->id}");

        $response->assertStatus(200)
                 ->assertJsonFragment([
                     'id' => $producer->id
                 ]);
    }

    public function test_can_update_producer()
    {
        $producer = Producer::factory()->create();

        $response = $this->putJson("/api/v1/producers/{$producer->id}", [
            'commission' => 90
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('producers', [
            'id' => $producer->id,
            'commission' => 90
        ]);
    }

    public function test_can_delete_producer()
    {
        $producer = Producer::factory()->create();

        $response = $this->deleteJson("/api/v1/producers/{$producer->id}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('producers', [
            'id' => $producer->id
        ]);
    }
}

