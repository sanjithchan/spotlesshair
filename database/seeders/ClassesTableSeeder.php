<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ClassesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $class = [
            ['name' => '10th'],
            ['name' => '9th'],
            ['name' => 'Plus one'],
            ['name' => 'Plus Two'],
          
            
        ];

        DB::table('classes')->insert($class);
    }
}
