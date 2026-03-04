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
                 ->assertJsonCount(3);
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
            'relevance_score' => 80.5,
            'is_trending' => false,
        ];

        $response = $this->postJson('/api/v1/producers', $data);

        $response->assertStatus(201)
                 ->assertJsonFragment([
                     'name' => 'Rhuan Cavalcante'
                 ]);

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
