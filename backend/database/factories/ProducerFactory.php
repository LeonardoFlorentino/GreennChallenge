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
            'image_url_has_name' => true,
            'followers_instagram' => fake()->numberBetween(1000, 1000000),
            'is_trending' => fake()->boolean(),
            'category' => fake()->randomElement([
                'Marketing Digital',
                'Financas',
                'Saude',
                'Negocios',
            ]),
            'direct_sales_last_year' => fake()->numberBetween(100000, 100000000),
            'indirect_sales_last_year' => fake()->numberBetween(100000, 100000000),
            'direct_sales_last_month' => fake()->numberBetween(10000, 10000000),
            'indirect_sales_last_month' => fake()->numberBetween(10000, 10000000),
            'last_sale_value' => fake()->numberBetween(1000, 20000000),
        ];
    }
}
