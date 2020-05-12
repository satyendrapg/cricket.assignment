<?php

namespace App\Providers;

use App\Repositories\PlayerRepository;
use App\Repositories\Interfaces\PlayerRepositoryInterface;
use App\Repositories\TeamRepository;
use App\Repositories\Interfaces\TeamRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            PlayerRepositoryInterface::class,
            PlayerRepository::class
        );

        $this->app->bind(
            TeamRepositoryInterface::class,
            TeamRepository::class
        );
    }


}
