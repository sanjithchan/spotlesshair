<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SubjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('subjects')->insert([
            [
                'name' => 'Math',
                'created_at' => Carbon::now(),               
                
            ],
            [
                'name' => 'Science',
                'created_at' => Carbon::now(),          
              
            ],
            [
                'name' => 'History',
                'created_at' => Carbon::now(),          
               
            ],
            [
                'name' => 'Geography',
                'created_at' => Carbon::now(),
               
            ],
            [
                'name' => 'English',
                'created_at' => Carbon::now(),
               
            ],
            [
                'name' => 'Art',
                'created_at' => Carbon::now(),
               
            ],
            [
                'name' => 'Music',
                'created_at' => Carbon::now(),
                
            ],
            [
                'name' => 'Physical Education',
                'created_at' => Carbon::now(),
                
            ],
            [
                'name' => 'Computer Science',
                'created_at' => Carbon::now(),
                
            ],
            [
                'name' => 'Chemistry',
                'created_at' => Carbon::now(),
               
            ],
        ]);
    }
}
