<?php namespace Stakes\Controllers;

use Stakes\Transformers\TransactionTransformer;
use Stakes\Models\Transaction;
use Input, Validator, Hash;

class TransactionsController extends ApiController {

	/**
	 * Display a listing of the resource.
	 * GET /transactions
	 *
	 * @return Response
	 */
	public function index() {
		$users = Transaction::get();
		return $this->respondWithCollection( $users, new TransactionTransformer );
	}

	/**
	 * Store a newly created resource in storage.
	 * POST /transactions
	 *
	 * @return Response
	 */
	public function store() {
		//
	}

	/**
	 * Display the specified resource.
	 * GET /transactions/{id}
	 *
	 * @param int     $id
	 * @return Response
	 */
	public function show( $id ) {
		//
	}

	/**
	 * Update the specified resource in storage.
	 * PUT /transactions/{id}
	 *
	 * @param int     $id
	 * @return Response
	 */
	public function update( $id ) {
		//
	}

	/**
	 * Remove the specified resource from storage.
	 * DELETE /transactions/{id}
	 *
	 * @param int     $id
	 * @return Response
	 */
	public function destroy( $id ) {
		//
	}

}
