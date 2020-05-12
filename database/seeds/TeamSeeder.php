<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Team;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Team::create([
            'name' => 'Mumbai Indians',
            'clubState' => "Mumbai",
            'logoUri' => Str::random(10).'.jpg',
        ]);
    }
}
