<?php namespace Stakes\Controllers;

use Stakes\Repositories\UserRepositoryInterface;
use Stakes\Transformers\UserTransformer;
use League\Fractal;
use Stakes\Models\User;
use Input, Validator;

class UserController extends ApiController
{

    public function listAll()
    {
        $users = User::get();
        return $this->respondWithCollection($users, new UserTransformer);
    }

    public function addUser()
    {
        $username = Input::get('username');
        $validator = Validator::make(
            array('username' => $username),
            array('username' => 'unique:users')
        );
        if($validator->fails()) {
            return $this->errorConflict();
        }
        $user = User::create(array('username' => $username));
        return $this->respondWithItem($user, new UserTransformer);
    }

}
