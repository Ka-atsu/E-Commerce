<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition()
    {
        return [
            'product_name' => $this->faker->words(3, true), // Generate a product name
            'product_description' => $this->faker->sentence(10), // Generate a description
            'product_category' => $this->faker->word(), // Random category
            'product_amount' => $this->faker->randomFloat(2, 10, 10000), // Price between 10.00 and 10,000.00
            'product_available_quantity' => $this->faker->numberBetween(1, 100), // Quantity between 1 and 100
            'product_barcode' => $this->faker->unique()->ean13(), // Unique 13-digit barcode
        ];
    }
}
