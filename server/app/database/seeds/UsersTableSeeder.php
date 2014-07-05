<?php

use Stakes\Models\User;

class UsersTableSeeder extends Seeder {
    public function run() {
        DB::table('users')->truncate();

        User::create([
                'username'   => 'admin',
                'password'   => Hash::make('123456'),
                'super_user' => true,
                'created_at' => new DateTime,
                'updated_at' => new DateTime,
            ]);
        User::create([
                'username'   => 'user',
                'password'   => Hash::make('123456'),
                'super_user' => false,
                'created_at' => new DateTime,
                'updated_at' => new DateTime,
            ]);

        User::create([
                'username'   => 'bob',
                'password'   => Hash::make('123456'),
                'super_user' => false,
                'created_at' => new DateTime,
                'updated_at' => new DateTime,
            ]);

    }

}
