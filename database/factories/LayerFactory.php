<?php

namespace Database\Factories;

use App\Models\Journal;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Layer>
 */
class LayerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'journal_id' => Journal::factory(), // Relasi ke journal
            'value' => $this->faker->randomFloat(2, 1, 100),
            'lot' => $this->faker->randomFloat(2, 0.1, 5),
            'close' => $this->faker->randomFloat(2, 1, 100),
            'order' => $this->faker->numberBetween(1, 100),
        ];
    }
}
