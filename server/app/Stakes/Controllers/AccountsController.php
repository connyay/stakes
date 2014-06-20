<?php namespace Stakes\Controllers;

use Stakes\Transformers\AccountTransformer;
use Stakes\Models\Account;
use Input, Validator, Hash;

class AccountsController extends ApiController {

	/**
	 * Display a listing of the resource.
	 * GET /accounts
	 *
	 * @return Response
	 */
	public function index() {
		$users = Account::get();
		return $this->respondWithCollection( $users, new AccountTransformer );
	}

	/**
	 * Store a newly created resource in storage.
	 * POST /accounts
	 *
	 * @return Response
	 */
	public function store() {
		//
	}

	/**
	 * Display the specified resource.
	 * GET /accounts/{id}
	 *
	 * @param int     $id
	 * @return Response
	 */
	public function show( $id ) {
		//
	}

	/**
	 * Update the specified resource in storage.
	 * PUT /accounts/{id}
	 *
	 * @param int     $id
	 * @return Response
	 */
	public function update( $id ) {
		//
	}

	/**
	 * Remove the specified resource from storage.
	 * DELETE /accounts/{id}
	 *
	 * @param int     $id
	 * @return Response
	 */
	public function destroy( $id ) {
		//
	}

}
