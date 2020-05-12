<?php
namespace App\Repositories;

use App\Models\Player;
use App\Repositories\Interfaces\PlayerRepositoryInterface;

class PlayerRepository implements PlayerRepositoryInterface
{
    /**
     * Get's a player by it's ID
     * @param int
     * @return collection
     */
    public function get($player_id)
    {
        return Player::find($player_id);
    }

    /**
     * Get's all players
     * @return mixed
     */
    public function all()
    {
        return Player::all();
    }

    /**
     * Get's all players by team
     * @return mixed
     */
    public function getTeamPlayers($teamId)
    {
        return Player::where('teamId','=',$teamId)->get();
    }

    /**
     * Deletes a player
     * @param int
     */
    public function delete($player_id)
    {
        Player::destroy($player_id);
    }

    /**
     * Updates a player.
     * @param int
     * @param array
     */
    public function update($player_id, array $player_data)
    {
        Player::find($player_id)->update($player_data);
    }
}
