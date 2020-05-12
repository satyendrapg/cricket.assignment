<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Player;

class PlayerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Player::create([
            'teamId' => '2',
            'firstName' => "Rohit",
            'lastName' => "Sharma",
            'imageUri' => Str::random(10).'.jpg',
            'jerseyNumber' => "08",
            'country' => "India",
            'matches' => "108",
            'runs' => "2778",
            'highestScores' => "118",
            'fifties' => "21",
            'hundreds' => "4",
        ]);
    }
}
