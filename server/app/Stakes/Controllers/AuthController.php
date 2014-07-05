<?php
namespace Stakes\Controllers;

use Auth;
use Input;
use Stakes\Models\User;
use Stakes\Transformers\UserTransformer;

class AuthController extends ApiController {

    public function login() {
        $data = Input::all();

        if (Auth::attempt(array('username' => $data['username'], 'password' => $data['password']))) {
            return $this->respondWithItem(Auth::user(), new UserTransformer);

        }
        return $this->errorUnauthorized('Could not login');

    }

    public function logout() {
        Auth::logout();

        return $this->success();

    }
}
