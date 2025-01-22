<?php

namespace Database\Factories;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Profile>
 */
class ProfileFactory extends Factory
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
            'full_name' => $this->faker->name,
            'whatsapp_number' => $this->faker->phoneNumber,
            'city_of_residence' => $this->faker->city,
            'address' => $this->faker->address,
            'mt4_account_name' => $this->faker->word,
            'mt4_login_number' => $this->faker->numberBetween(1000, 9999),
            'investor_password' => $this->faker->password,
        ];
    }
}
