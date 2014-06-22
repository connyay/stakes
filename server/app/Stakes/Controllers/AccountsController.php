<?php namespace Stakes\Controllers;

use Stakes\Transformers\AccountTransformer;
use Stakes\Models\Account;
use Input, Hash;

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
		$account = new Account();
		$data = Input::all();
		$account->fill( $data );
		// attempt validation
		if ( $account->isValid() ) {
			$account->save();
			return $this->respondWithItem( $account, new AccountTransformer );
		}

		return $this->errorWrongArgs();
	}

	/**
	 * Display the specified resource.
	 * GET /accounts/{id}
	 *
	 * @param int     $id
	 * @return Response
	 */
	public function show( $id ) {
		$account = Account::where( 'account_id', '=', $id )->first();
		if ( is_null( $account ) ) {
			return $this->errorNotFound();
		}
		return $this->respondWithItem( $account, new AccountTransformer );
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
		$account = Account::where( 'account_id', '=', $id )->first();
		if ( is_null( $account ) ) {
			return $this->errorNotFound();
		}
		$account->delete();
		return $this->success();
	}

}
