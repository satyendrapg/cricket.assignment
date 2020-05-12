<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMatchesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('matches', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->smallInteger('team1');
            $table->smallInteger('team2');
            $table->smallInteger('team1_scores');
            $table->smallInteger('team2_scores');
            $table->smallInteger('winner')->nullable();
            $table->smallInteger('points')->nullable();
            $table->dateTime('matchDate')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('matches');
    }
}
