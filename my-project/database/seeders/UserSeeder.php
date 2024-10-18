<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Create 10 users with sample data
        User::create([
            'name' => 'Admin',
            'password' => bcrypt('password123'), // Hashing the password
        ]);

        // // You can use a loop or factory for more users
        // for ($i = 1; $i <= 9; $i++) {
        //     User::create([
        //         'name' => 'User ' . $i,
        //         'password' => bcrypt('password' . $i), // Different passwords for each user
        //     ]);
        // }
    }
}
