<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //
        Passport::tokensCan([
            'manage-users' => 'Manage users scope',
            'read-only-users' => 'Read only users scope',
            'create-users' => 'Create users permission',
            'read-users' => 'Read users permission',
            'update-users' => 'Update users permission',
            'delete-users' => 'Delete users permission',
        ]);

        Passport::routes();
    }
}
