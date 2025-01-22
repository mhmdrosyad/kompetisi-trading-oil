<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Journal>
 */
class JournalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(), // Relasi ke user
            'open_date' => $this->faker->date,
            'close_date' => $this->faker->date,
            'open_time' => $this->faker->time,
            'close_time' => $this->faker->time,
            'trigger_so' => $this->faker->word,
            'tipe_order' => $this->faker->word,
            'jml_layer' => $this->faker->numberBetween(1, 5),
            'note' => $this->faker->text,
            'tp' => $this->faker->randomFloat(2, 10, 100),
            'sl' => $this->faker->randomFloat(2, 10, 100),
            'profit_loss' => $this->faker->randomFloat(2, -100, 100),
            'averaging' => $this->faker->randomFloat(2, 1, 10),
        ];
    }
}
