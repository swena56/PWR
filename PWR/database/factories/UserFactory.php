<?php

use Faker\Generator as Faker;
/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

//$users = factory(App\User::class, 3)->make();
//$users = factory(App\User::class, 100)->create();
//return json_encode(factory(App\User::class, 3)->make());

$factory->define(App\User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'admin' => 0,
        'password' => bcrypt($faker->date($format = 'Y-m-d H:i:s')), // secret
        'remember_token' => str_random(10),
        'last_login' => $faker->date($format = 'Y-m-d H:i:s'),
        'created_at' => $faker->date($format = 'Y-m-d H:i:s')
    ];
});
