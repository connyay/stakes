<?php namespace Stakes\Controllers;

use Stakes\Repositories\UserRepositoryInterface;
use Stakes\Transformers\UserTransformer;
use League\Fractal;
use Stakes\Models\User;
use Input, Validator, Hash;

class UserController extends ApiController
{

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() {
        $users = User::get();
        return $this->respondWithCollection( $users, new UserTransformer );
    }


    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store() {
        $username = Input::get( 'username' );
        $validator = Validator::make(
            array( 'username' => $username ),
            array( 'username' => 'unique:users' )
        );
        if ( $validator->fails() ) {
            return $this->errorConflict();
        }
        $password = Hash::make( Input::get( 'password' ) );
        $user = User::create( array( 'username' => $username, 'password' => $password ) );
        return $this->respondWithItem( $user, new UserTransformer );
    }


    /**
     * Display the specified resource.
     *
     * @param int     $id
     * @return Response
     */
    public function show( $id ) {
        $user = User::find( $id );
        if ( is_null( $user ) ) {
            return $this->errorNotFound();
        }
        //dd($user->created_at->toISO8601String())
        return $this->respondWithItem( $user, new UserTransformer );
    }


    /**
     * Update the specified resource in storage.
     *
     * @param int     $id
     * @return Response
     */
    public function update( $id ) {
        $user = User::find( $id );
        if ( is_null( $user ) ) {
            return $this->errorNotFound();
        }

        $password = Input::get( 'password' );
        if(!is_null($password)) {
            $user->password = Hash::make($password);
        }
        $isAdmin = Input::get( 'isAdmin' );
        if(!is_null($isAdmin)) {
            $user->super_user = $isAdmin;
        }
        $user->username = Input::get( 'username' );
        $user->save();
        return $this->respondWithItem( $user, new UserTransformer );
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param int     $id
     * @return Response
     */
    public function destroy( $id ) {
        $user = User::find( $id );
        if ( is_null( $user ) ) {
            return $this->errorNotFound();
        }
        $user->delete();
        return $this->success();
    }

}
