<?php namespace Stakes\Controllers;

use Stakes\Transformers\UserTransformer;
use Stakes\Models\User;
use Input, Hash;

class UserController extends ApiController
{

    /**
     * Display a listing of the resource.
     * GET /users
     *
     * @return Response
     */
    public function index() {
        $users = User::get();
        return $this->respondWithCollection( $users, new UserTransformer );
    }

    /**
     * Store a newly created resource in storage.
     * POST /users
     *
     * @return Response
     */
    public function store() {
        $user = new User();
        $data = Input::all();

        // attempt validation
        if ( $user->validate( $data ) ) {
            $data['password'] = Hash::make( $data['password'] );
            $user = $user->fill( $data );
            if ( isset( $data['isAdmin'] ) ) {
                $user->super_user = $data['isAdmin'];
            }
            $user->save();

            return $this->respondWithItem( $user, new UserTransformer );
        }

        return $this->errorConflict();
    }

    /**
     * Display the specified resource.
     * GET /users/{id}
     *
     * @param int     $id
     * @return Response
     */
    public function show( $id ) {
        $user = User::find( $id );
        if ( is_null( $user ) ) {
            return $this->errorNotFound();
        }
        return $this->respondWithItem( $user, new UserTransformer );
    }

    /**
     * Update the specified resource in storage.
     * PUT /users/{id}
     *
     * @param int     $id
     * @return Response
     */
    public function update( $id ) {
        $user = User::find( $id );
        if ( is_null( $user ) ) {
            return $this->errorNotFound();
        }
        $data = Input::all();
        if ( isset( $data['password'] ) ) {
            $user->password = Hash::make( $data['password'] );
        }
        if ( isset( $data['isAdmin'] ) ) {
            $user->super_user = $data['isAdmin'];
        }
        $user->username = $data['username'];
        $user->save();
        return $this->respondWithItem( $user, new UserTransformer );
    }

    /**
     * Remove the specified resource from storage.
     * DELETE /users/{id}
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
