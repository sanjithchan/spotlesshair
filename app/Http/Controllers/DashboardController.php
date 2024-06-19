<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use View;

class DashboardController extends Controller
{
    /**
     * The header data to be shared with views.
     *
     * @var array
     */
    protected $headerdata;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        // Define header data
        $this->headerdata = [
            'pageheadertitle' => 'Dashboard',
            'lefttitle' => 'dashboard',
            'breadcrumbs' => []
        ];

        // Share header data with all views
        View::share('headerdata', $this->headerdata);

        // Return the view for the dashboard
        return view('spotlesshairadmin.home');
    }
}
