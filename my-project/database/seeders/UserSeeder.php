<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
class UserSeeder extends Seeder
{
    public function run()
    {
       
            // Creating an admin user
            User::create([
                'name' => 'Admin',
                'email' => 'admin@example.com',
                'password' => Hash::make('adminpassword'),
                'contact' => '123-456-7890',
                'role' => 'admin',  // Assigning the 'admin' role
            ]);
        
        }
        
    }

