<?php

use Illuminate\Database\Seeder;
use App\Models\Match;

class MatchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Match::create([
            'team1' => 1,
            'team2' => 2,
            'matchDate' => "2020-05-12",
            'winner' => 1,
            'points' => 2,
            'team1_scores' => 183,
            'team2_scores' => 180,
        ]);
    }
}
