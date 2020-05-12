<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlayersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('players', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->smallInteger('teamId');
            $table->string('firstName',100);
            $table->string('lastName',100);
            $table->string('image',255)->nullable();
            $table->string('country',50)->nullable();
            $table->smallInteger('jerseyNumber')->nullable();
            $table->smallInteger('matches')->nullable();
            $table->smallInteger('runs')->nullable();
            $table->smallInteger('highestScores')->nullable();
            $table->smallInteger('fifties')->nullable();
            $table->smallInteger('hundreds')->nullable();
            $table->timestamps();
            $table->index('teamId');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('players');
    }
}
