<?php

Route::post( 'login', array( 'as' => 'login', 'uses' => 'Stakes\Controllers\AuthController@login' ) );
Route::post( 'logout', array( 'as' => 'logout', 'uses' => 'Stakes\Controllers\AuthController@logout' ) );


Route::resource( 'users', 'Stakes\Controllers\UserController',
    ['except' => ['create', 'edit']] );

Route::resource( 'accounts', 'Stakes\Controllers\AccountsController',
    ['except' => ['create', 'edit']] );

Route::resource( 'transactions', 'Stakes\Controllers\TransactionsController',
    ['except' => ['create', 'edit']] );

Route::get( '/admin', function() {
        return View::make( 'admin' );
    } );

Route::get( '/', function() {
        return View::make( 'index' );
    } );
