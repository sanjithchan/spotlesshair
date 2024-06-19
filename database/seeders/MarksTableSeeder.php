<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MarksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $marks = [
            ['mark' => '56', 'student_id' => 1,'subject_id' => 1],
            ['mark' => '45', 'student_id' => 2,'subject_id' => 1],
            ['mark' => '89', 'student_id' => 3, 'subject_id' => 1],
            ['mark' => '56', 'student_id' => 4,  'subject_id' => 1],
            ['mark' => '58', 'student_id' => 5, 'subject_id' => 1],
         

            ['mark' => '51', 'student_id' => 1, 'subject_id' => 2],
            ['mark' => '44', 'student_id' => 5, 'subject_id' => 2],
            ['mark' => '47', 'student_id' => 4, 'subject_id' => 2],
            ['mark' => '78', 'student_id' => 3, 'subject_id' => 2],
            ['mark' => '88', 'student_id' => 2, 'subject_id' => 2],

            ['mark' => '69', 'student_id' => 2, 'subject_id' => 3],
            ['mark' => '85', 'student_id' => 4, 'subject_id' => 3],
            ['mark' => '75', 'student_id' => 3, 'subject_id' => 3],
            ['mark' => '55', 'student_id' => 5, 'subject_id' => 3],
            ['mark' => '87', 'student_id' => 1, 'subject_id' => 3],

            ['mark' => '53', 'student_id' => 2, 'subject_id' => 4],
            ['mark' => '49', 'student_id' => 4, 'subject_id' => 5],
            ['mark' => '50', 'student_id' => 3, 'subject_id' => 6],
            ['mark' => '39', 'student_id' => 5, 'subject_id' => 7],
            ['mark' => '87', 'student_id' => 1, 'subject_id' => 8],
            ['mark' => '98', 'student_id' => 2, 'subject_id' => 9],
            ['mark' => '85', 'student_id' => 1, 'subject_id' => 10],
            
        ];

        DB::table('marks')->insert($marks);
    }
}
