<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\StudentController;

      
define('TITLE', 'SpotLess Hair');
define('ADMIN', 'spotlesshairadmin');
define('SETTIMEOUT', 500);

Route::get('/', [HomeController::class, 'homeDetails'])->name('home');


Route::get('/{key}', [HomeController::class, 'getmenuData'])->name('getmenudata');




Route::get(ADMIN, function () {
    return redirect()->route('login');
});

Auth::routes();

Route::get(ADMIN.'/dashboard', [DashboardController::class, 'index'])->name('dashboard');

/*Manage Menu */
Route::get(ADMIN.'/menus', [MenuController::class, 'index'])->name('menus');
Route::get(ADMIN.'/menus/list', [MenuController::class, 'list'])->name('menus.list');
Route::get(ADMIN.'/menu/create', [MenuController::class, 'create'])->name('menu.create');
Route::post(ADMIN.'/menu/store', [MenuController::class, 'store'])->name('menu.store');
Route::get(ADMIN.'/menu/edit/{key}', [MenuController::class, 'edit'])->name('menu.edit');
Route::get(ADMIN.'/menu/editcontent/{key}', [MenuController::class, 'editcontent'])->name('menu.editcontent');
Route::post(ADMIN.'/menu/updateContent/{key}', [MenuController::class, 'updateContent'])->name('menu.updateContent');
Route::post(ADMIN . '/menu/update/{key}', [MenuController::class, 'update'])->name('menu.update');
Route::post(ADMIN .'/checkmenuexists', [MenuController::class, 'checkmenuexists'])->name('checkmenuexists');
Route::post(ADMIN . '/menu/destroy', [MenuController::class, 'destroy'])->name('menu.destroy');


/*Students */
Route::get(ADMIN.'/students', [StudentController::class, 'index'])->name('students');
Route::get(ADMIN.'/students/list', [StudentController::class, 'list'])->name('students.list');