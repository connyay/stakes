<?php namespace Stakes\Controllers;

use Stakes\Repositories\UserRepositoryInterface;
use Stakes\Transformers\UserTransformer;
use League\Fractal;
use Stakes\Models\User;

class UserController extends ApiController
{

    /**
     * Display a listing of all the users.
     *
     * @return Response
     */
    public function listAll()
    {
        $users = User::get();
        return $this->respondWithCollection($users, new UserTransformer);
    }

}
