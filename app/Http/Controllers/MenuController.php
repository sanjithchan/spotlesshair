<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Carbon\Carbon;
use App\Models\Menu;
use Illuminate\Support\Facades\Session;
use View;
use DB;
use DataTables;

class MenuController extends Controller
{
    protected $headerdata;

    public function __construct()
    {
        $this->middleware('auth');

        /* Breadcrumb Generation */
        $breadcrumbs = array(
            'links' => array(
                '0' => array(
                    'title'   => 'Manage Menu',
                    'url'     => url(ADMIN.'/menus'),
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
            'pageheadertitle' => 'Menus',
            'lefttitle' => 'menus',
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
        return view(ADMIN.'.menus.listing');
    }

    /**
     * Show the form for creating a new menu.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function create()
    {
        $headerdata = $this->headerdata;
        $headerdata['breadcrumbs']['links'][1]['title'] = 'Create';
        View::share('headerdata', $headerdata);

        $parentMenu = DB::table('menus')->whereNull('parent_id')->get();

        return view(ADMIN.'.menus.create', compact('parentMenu'));
    }

    /**
     * Store a newly created menu in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $input = $request->input();
        $menukey = $this->generateUniqueKey('8', 'menus', 'menu_uuid');
        
        $menuObj = new Menu();
        $menuObj->page_name = $input['page_name'];
        $menuObj->menu_uuid = $menukey;
        $menuObj->menu_name = $input['menu_name'];
        $menuObj->page_link = $input['page_link'];
        $menuObj->parent_id = $input['parent_id'];
        $menuObj->title = $input['title'];
        $menuObj->meta_description = $input['meta_description'];
        $menuObj->meta_keywords = $input['meta_keywords'];
        $menuObj->sort_order = $input['sort_order'];
        $menuObj->status = $input['status'];
        $menuObj->created_at = Carbon::now();
        $menuObj->updated_at = null;
        $menuObj->save();

        session()->flash('message', 'Menu created successfully!');
        return Redirect::to(url(ADMIN.'/menus'));
    }

    /**
     * List all menus with pagination and search.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Contracts\Support\Renderable
     */
    public function list(Request $request)
    {
        if ($request->ajax()) {
            $pageSize = ($request->length) ? $request->length : 10;
            $start = ($request->start) ? $request->start : 0;
            $search = $request->input('search.value');
            $count_filter = 0;

            $menuData = Menu::select('page_name','page_link','parent_id','id','menu_uuid','created_at')->orderBy('created_at', 'desc');

            if ($search != '') {
                $menuData->where('page_name', 'like', '%'.$search.'%');
                $count_filter = $menuData->count();
            }

            $count_total = $menuData->count();
            if ($count_filter == 0) {
                $count_filter = $count_total;
            }

            $data = $menuData->get();

            return Datatables::of($data)
                ->setOffset($start)
                ->addIndexColumn()
                ->addColumn('page_name', function($row){                
                    return '<div class="d-flex align-items-center"><p class="mb-0 mx-2"><small>'.$row->page_name.'</small></p> </div>';   
                })
                ->addColumn('page_link', function($row){                
                    return '<div class="d-flex align-items-center"><p class="mb-0 mx-2"><small>'.$row->page_link.'</small></p> </div>';   
                })
                ->addColumn('parent_menu', function($row){
                    $parentMenu = Menu::where('id', $row->parent_id)->first();
                    $parentMenuName = !empty($parentMenu) ? $parentMenu->page_name : '--';
                    return '<a class="list-hover"><p class="list-hover">'.$parentMenuName.'<br></p></a>';
                })
                ->addColumn('created_at', function($row){
                    $createdAt = ($row->created_at != '' && $row->created_at != '0000-00-00') ? date('d/m/Y', strtotime($row->created_at)) : '--';           
                    return '<a class="list-hover"><span class="cmn-date">'.$createdAt.'</span></a>';
                })
                ->addColumn('action', function($row){
                    $editBtn = '<a href="' . url(ADMIN . '/menu/edit/' . $row->menu_uuid) . '" class="btn btn-primary edit-btn px-2 py-1 ms-1" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit"><i class="fas fa-edit"></i> Edit</a>';
                    $addcontentBtn = '<a href="' . url(ADMIN . '/menu/editcontent/' . $row->menu_uuid) . '" class="btn btn-primary edit-btn px-2 py-1 ms-1" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit Page Contents"><i class="fas fa-edit"></i> Edit Page Contents</a>';
                    $deleteBtn = '<a onclick="showDeleteModal(' . $row->id . ');" class="btn btn-danger px-2 py-1 ms-1" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete"><i class="far fa-times-circle"></i> Delete</a>';
                    return $editBtn . $addcontentBtn . $deleteBtn;
                })
                ->with([
                    "recordsTotal" => $count_total,
                    "recordsFiltered" => $count_filter,
                    "start" => $start,
                ])
                ->rawColumns(['page_name', 'page_link', 'created_at', 'parent_menu', 'action'])
                ->make(true);
        }

        return view(ADMIN.'.menus.listing');
    }

    /**
     * Show the form for editing the specified menu.
     *
     * @param  string  $key
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function edit($key)
    {
        if (!$key) {
            return redirect()->route('menu.index');
        }

        $headerdata = $this->headerdata;
        $headerdata['breadcrumbs']['links'][1]['title'] = 'Edit';
        View::share('headerdata', $headerdata);

        $menudata = DB::table('menus')->where('menu_uuid', $key)->first();

        if (empty($menudata)) {
            return redirect()->route('menu.index');
        }

        $parentMenu = DB::table('menus')->whereNull('parent_id')->get();
        return view(ADMIN.'.menus.edit', compact('menudata', 'parentMenu'));
    }

    /**
     * Check if the menu exists.
     *
     * @return string
     */
    public function checkmenuexists()
    {
        if (request()->ajax()) {
            $data = request()->all();

            if (isset($data['page_link'])) {
                $existmenuid = (isset($data['menu_id'])) ? $data['menu_id'] : '';
                $existdata = $existmenuid != '' ?
                    Menu::where('page_link', $data['page_link'])->where('id', '!=', $existmenuid)->limit(1)->first() :
                    Menu::where('page_link', $data['page_link'])->limit(1)->first();

                return !empty($existdata) ? 'false' : 'true';
            }

            if (isset($data['menu_name'])) {
                $existmenuid = (isset($data['menu_id'])) ? $data['menu_id'] : '';
                $existmenudata = $existmenuid != '' ?
                    Menu::where('menu_name', $data['menu_name'])->where('id', '!=', $existmenuid)->limit(1)->first() :
                    Menu::where('menu_name', $data['menu_name'])->limit(1)->first();

                return !empty($existmenudata) ? 'false' : 'true';
            }
        }
    }

    /**
     * Generate a unique key for the menu.
     *
     * @param  int  $count
     * @param  string  $table
     * @param  string  $field
     * @return string
     */
    function generateUniqueKey($count, $table, $field)
    {
        $ukey = substr(strtolower(md5(microtime() . rand())), 0, $count);
        while ($this->checkDuplicate($table, $field, $ukey)) {
            $ukey = substr(strtolower(md5(microtime() . rand())), 0, $count);
        }
        return $ukey;
    }

    /**
     * Check for duplicate entry in the table.
     *
     * @param  string  $table
     * @param  string  $field1
     * @param  string  $fieldvalue1
     * @param  string  $field2
     * @param  string  $fieldvalue2
     * @return bool
     */
    function checkDuplicate($table, $field1, $fieldvalue1, $field2 = '', $fieldvalue2 = '')
    {
        $query = DB::table($table)->where($field1, $fieldvalue1)->first();
        return $query ? true : false;
    }

    /**
     * Update the specified menu in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $key
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $key)
    {
        $menuObj = Menu::where('menu_uuid', $key)->first();
        $input = $request->input();

        if (empty($menuObj)) {
            return Redirect::to(url(ADMIN.'/menus'));
        }

        $menuObj->menu_name = $input['menu_name'];
        $menuObj->parent_id = $input['parent_id'];
        $menuObj->title = $input['title'];
        $menuObj->meta_description = $input['meta_description'];
        $menuObj->meta_keywords = $input['meta_keywords'];
        $menuObj->sort_order = $input['sort_order'];
        $menuObj->status = $input['status'];
        $menuObj->updated_at = Carbon::now();
        $menuObj->update();

        session()->flash('message', 'Menu updated successfully!');
        return redirect(ADMIN.'/menus');
    }

    /**
     * Remove the specified menu from the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $request)
    {
        if (request()->ajax()) {
            $data = request()->all();

            if (!$data['id']) {
                return response()->json(['error' => 1, 'errormsg' => 'Fields missing']);
            }

             // Check if the menu item is assigned as a parent to other menus
            $isParentMenu = Menu::where('parent_id', $data['id'])->exists();

            if ($isParentMenu) {
                return response()->json(['error' => 1, 'errormsg' => 'This menu is a parent to other menus. You cannot delete it.']);
            }




            $postobject = Menu::where('id', $data['id'])->first();
            $postobject->delete();

            return response()->json(['message' => 'Menu deleted successfully.', 'success' => 1]);
        }
    }

    /**
     * Show the form for editing the content of the specified menu.
     *
     * @param  string  $key
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function editcontent($key)
    {
        if (!$key) {
            return redirect()->route('menu.index');
        }

        $headerdata = $this->headerdata;
        $headerdata['breadcrumbs']['links'][1]['title'] = 'Edit Content';
        View::share('headerdata', $headerdata);

        $menudata = DB::table('menus')->where('menu_uuid', $key)->first();

        if (empty($menudata)) {
            return redirect()->route('menu.index');
        }

        return view(ADMIN.'.menus.editcontent', compact('menudata'));
    }

    /**
     * Update the content of the specified menu in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $key
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateContent(Request $request, $key)
    {
        $menuObj = Menu::where('menu_uuid', $key)->first();
        $input = $request->input();

        if (empty($menuObj)) {
            return Redirect::to(url(ADMIN.'/menus'));
        }

        $menuObj->main_content = $input['main_content'];
        $menuObj->updated_at = Carbon::now();
        $menuObj->update();

        session()->flash('message', 'Page content updated successfully!');
        return redirect(ADMIN.'/menus');
    }
}
