<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Producer>
 */
class ProducerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
public function definition(): array
{
    return [
        'name' => fake()->name(),
        'email' => fake()->unique()->safeEmail(),
        'document' => fake()->unique()->numerify('###########'),
        'status' => 'active',
        'commission' => fake()->numberBetween(10, 80),
        'imageUrl' => fake()->imageUrl(),
        'followers_instagram' => fake()->numberBetween(1000, 1000000),
        'relevance_score' => fake()->randomFloat(2, 0, 100),
        'is_trending' => fake()->boolean(),
    ];
}
}
