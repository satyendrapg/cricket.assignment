<?php

namespace App\Repositories\Interfaces;

use App\Models\Player;

interface PlayerRepositoryInterface
{
    /**
     * Get's a player by it's ID
     * @param int
     */
    public function get($playerId);

    /**
     * Get's all players.
     * @return mixed
     */
    public function all();

    /**
     * Get's all players by team.
     * @return mixed
     */
    public function getTeamPlayers($teamId);

    /**
     * Deletes a player
     * @param int
     */
    public function delete($playerId);

    /**
     * Updates a player
     * @param int
     * @param array
     */
    public function update($playerId, array $player_data);
}
