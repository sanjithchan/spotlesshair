<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class StudentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = [
            ['name' => 'John Doe', 'class_id' => 1],
            ['name' => 'Jane Smith', 'class_id' => 2],
            ['name' => 'Sujith', 'class_id' => 3],
            ['name' => 'Sooraj', 'class_id' => 4],
            ['name' => 'Sachin', 'class_id' => 2],
            
        ];

        DB::table('students')->insert($students);
    }
}
