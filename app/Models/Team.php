<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $gaurded = ['id'];
    protected $fillable = ['name','logoUri','clubState'];
     /**
     * Get the Players for the team post.
     */
    public function players()
    {
        return $this->hasMany('App\Models\Player', 'teamId');
    }


}
