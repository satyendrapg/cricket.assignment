<?php
namespace App\Repositories;

use Illuminate\Support\Facades\DB;
use App\Models\Team;
use App\Repositories\Interfaces\TeamRepositoryInterface;

class TeamRepository implements TeamRepositoryInterface
{
    /**
     * Get's a team by it's ID
     * @param int
     * @return collection
     */
    public function get($team_id)
    {
        return Team::find($team_id);
    }

    /**
     * Get's all teams
     * @return mixed
     */
    public function all()
    {
        return Team::all();
    }

    /**
     * Deletes a team
     * @param int
     */
    public function delete($team_id)
    {
        Team::destroy($team_id);
    }

    /**
     * Updates a team.
     * @param int
     * @param array
     */
    public function update($team_id, array $team_data)
    {
        Team::find($team_id)->update($team_data);
    }

    /**
     * Get's all matches
     * @return mixed
     */
    public function getMatches()
    {
        $matches['data'] = DB::table('teams as tA')
        ->join('matches', 'tA.id', '=', 'matches.team1')
        ->join('teams', 'teams.id', '=', 'matches.team2')
        ->join('teams as tw', 'tw.id', '=', 'matches.winner')
        ->select(DB::raw('DATE_FORMAT(matches.matchDate, "%b %d, %Y") as matchDate'),'tA.name as teamFirst', 'teams.name as teamTwo','tw.name as teamWinner','matches.points as matchPoints', DB::raw("CONCAT(matches.team1_scores,'/',matches.team2_scores) as score"))
        ->get();
        return $matches;
    }

    /**
     * Get's all matches
     * @return mixed
     */
    public function getPoints()
    {
        $points['data'] = DB::table('teams as t1')
            ->leftJoin('matches', 't1.id', '=', 'matches.winner')
            ->select(DB::raw('count(matches.winner) as wins'),DB::raw('2 * count(matches.winner) as pts'),'t1.name as teamsName')
            ->groupBy('t1.name')
            ->get();

        return $points;
    }
}
