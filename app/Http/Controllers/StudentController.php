<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Carbon\Carbon;
use App\Models\Menu;
use View;
use DB;
use DataTables;
class StudentController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    protected $headerdata;
    public function __construct()
    {
        $this->middleware('auth');

         /* Breadcrum Generation */
        $breadcrumbs = array(
            'links' => array(
            '0' => array(
                'title'   => 'Students',
                'url'     => url(ADMIN.'/students'),
                'class'   => '',
                'haslink' => '1'
            ),
            '1' => array(
                'title'   => 'Listing',
                'url'     => '',
                'class'   => '',
                'haslink' => '0'
              )
           
            ),
            'backbutton' => ''
        );      
        
        $this->headerdata = array(
            'pageheadertitle' => 'Students',
            'lefttitle' => 'students',
            'breadcrumbs' => $breadcrumbs
          );
        View::share('headerdata', $this->headerdata);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {       
          
        return view(ADMIN.'.students.listing');
    }


  


    public function list(Request $request){

    

        if ($request->ajax()) {
            $pageSize = ($request->length) ? $request->length : 10;
            $start = ($request->start) ? $request->start : 0;
           // $search = $request->input('search.value');
            $count_filter = 0;
    
            
            $results = DB::table('marks as m')
            ->join('students as s', 'm.student_id', '=', 's.id')
            ->join('classes as c', 's.class_id', '=', 'c.id')
            ->join('subjects as sub', 'm.subject_id', '=', 'sub.id')
            ->select(
                's.name as Name_of_Student',
                'c.name as Class',
                'sub.name as Subject',
                DB::raw('SUM(m.mark) as Total_mark_in_all_semesters')
            )
            ->groupBy('s.id', 'sub.id')
            ->orderBy('s.name')
            ->orderBy('sub.name');
          

            



            $count_total = $results->count();
            if($count_filter == 0){
              $count_filter = $count_total;
            }
          
            $data = $results->get();

    
    
            return Datatables::of($data)
                ->setOffset($start)
                ->addIndexColumn()
    
            
                ->addColumn('name_of_student', function($row){                
                 
                    return '<div class="d-flex align-items-center"><p class="mb-0 mx-2"><small>'.$row->Name_of_Student.'</small></p> </div>';   
                 
              })
    
              ->addColumn('class', function($row){                
                 
                return '<div class="d-flex align-items-center"><p class="mb-0 mx-2"><small>'.$row->Class.'</small></p> </div>';   
             
              })
    
         
          ->addColumn('Subject', function($row){

                  
                    return   '<a class="list-hover" ><p class="list-hover ">'.$row->Subject.'<br></p></a>';
                })
    
       
    
                ->addColumn('total_mark', function($row){
                
                 
                 return   '<a class="list-hover"><span class="cmn-date">'.$row->Total_mark_in_all_semesters.'</span></a>';
                })
    
        
                
               
            ->with([
                "recordsTotal" => $count_total,
                "recordsFiltered" => $count_filter,
                "start" => $start,
            ])
            ->rawColumns(['name_of_student','Subject','total_mark','class'])
            ->make(true);
        }
        return view(ADMIN.'.menus.listing');
       }

       

  
}
