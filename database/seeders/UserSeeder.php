<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([

            [ 
              
                'name' => 'SpotLessHair admin',
                'email' => 'test@gmail.com',           
                'password' => bcrypt('Test@123'),            
                'created_at' => Carbon::now()
           
            ]
        ]);
    }
}
