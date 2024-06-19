<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Menu;
use Illuminate\Support\Facades\Session;
use View;
use DB;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // Constructor logic, if needed
    }

    /**
     * Show the application dashboard.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function homeDetails(Request $request)
    {
        $pagetitle = 'home';
        $data = [
            'pagetitle' => $pagetitle,
            'seo' => [
                'title' => 'Home',
                'keywords' => 'Spotless Hair.',
                'description' => 'Spotless Hair.',
                'url' => url('/home')
            ]
        ];

        return view('frontend.home', $data);
    }

    /**
     * Get menus.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getMenus()
    {
        $menus = Menu::whereNull('parent_id')
            ->select('menu_name', 'page_link')
            ->orderBy('sort_order', 'ASC')
            ->limit(8)
            ->get();

        return $menus;
    }

    /**
     * Get menu data by key.
     *
     * @param string $key
     * @return \Illuminate\Contracts\View\View|\Illuminate\Contracts\View\Factory
     */
    public function getMenuData($key)
    {

        if($key == 'home'){
            return view('frontend.home');
        }
        $menuDetails = Menu::select('main_content','title','meta_keywords','meta_description','page_name')->where('page_link', $key)->first();

        if (empty($menuDetails)) {
            return view('frontend.404');
        }

        $pagetitle = $menuDetails->page_name;
        $data = [
            'pagetitle' => $pagetitle,
            'menuDetails' => $menuDetails,
            'seo' => [
                'title' => $menuDetails->title,
                'keywords' => $menuDetails->meta_keywords,
                'description' => $menuDetails->meta_description,
                'url' => url('/')
            ]
        ];
    

        return view('frontend.pagedetails', $data);
    }
}
