<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function() {
    return View::make('index');
});

Route::post('login', array('as' => 'login', 'uses' => 'Stakes\Controllers\AuthController@login'));
Route::post('logout', array('as' => 'logout', 'uses' => 'Stakes\Controllers\AuthController@logout'));


Route::resource('users', 'Stakes\Controllers\UserController',
    ['except' => ['create', 'edit']]);

Route::resource('accounts', 'Stakes\Controllers\AccountsController',
    ['except' => ['create', 'edit']]);

Route::resource('transactions', 'Stakes\Controllers\TransactionsController',
    ['except' => ['create', 'edit']]);