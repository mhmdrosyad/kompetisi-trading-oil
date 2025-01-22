<?php

namespace Database\Seeders;

use App\Models\Journal;
use App\Models\Layer;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DumySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(50)->create()->each(function ($user) {
            // Setiap user akan memiliki profile
            Profile::factory()->create([
                'user_id' => $user->id
            ]);

            // Setiap user akan memiliki beberapa journal
            Journal::factory(3)->create([
                'user_id' => $user->id
            ])->each(function ($journal) {
                // Setiap journal akan memiliki beberapa layer
                Layer::factory(2)->create([
                    'journal_id' => $journal->id
                ]);
            });
        });
    }
}
