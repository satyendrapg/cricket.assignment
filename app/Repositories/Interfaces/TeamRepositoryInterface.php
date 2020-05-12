<?php

namespace App\Repositories\Interfaces;

use App\Models\Team;

interface TeamRepositoryInterface
{
    /**
     * Get's a team by it's ID
     * @param int
     */
    public function get($teamId);

    /**
     * Get's all teams.
     * @return mixed
     */
    public function all();

    /**
     * Deletes a team
     * @param int
     */
    public function delete($teamId);

    /**
     * Updates a team
     * @param int
     * @param array
     */
    public function update($teamId, array $team_data);

    /**
     * Get's all matches.
     * @return mixed
     */
    public function getMatches();

    /**
     * Get's all ponts table data.
     * @return mixed
     */
    public function getPoints();
}
