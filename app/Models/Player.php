<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    protected $fillable = ['teamId', 'firstName', 'lastName', 'imageUri', 'jerseyNumber', 'matches', 'runs', 'highestScores','fifties','hundreds','country'];
    /**
     * Get the team that owns the playe.
     */
    public function team()
    {
        return $this->belongsTo('App\Team');
    }
}
