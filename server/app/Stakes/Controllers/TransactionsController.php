<?php
namespace Stakes\Controllers;

use Input;
use Stakes\Models\Transaction;
use Stakes\Transformers\TransactionTransformer;

class TransactionsController extends ApiController {

    /**
	 * Display a listing of the resource.
	 * GET /transactions
	 *
	 * @return Response
	 */
    public function index() {
        $includes = Input::get('include');
        if ($includes === 'account') {
            $transactions = Transaction::with($includes)->get();
        } else {
            $transactions = Transaction::get();
        }

        return $this->respondWithCollection($transactions, new TransactionTransformer);
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
	 * GET /transactions/{transaction_id}
	 *
	 * @param int     $transaction_id
	 * @return Response
	 */
    public function show($transaction_id) {
        $transaction = Transaction::where('transaction_id', '=', $transaction_id)->first();
        if (is_null($transaction)) {
            return $this->errorNotFound();
        }
        return $this->respondWithItem($transaction, new TransactionTransformer);
    }

    /**
	 * Update the specified resource in storage.
	 * PUT /transactions/{transaction_id}
	 *
	 * @param int     $transaction_id
	 * @return Response
	 */
    public function update($transaction_id) {
        //
    }

    /**
	 * Remove the specified resource from storage.
	 * DELETE /transactions/{transaction_id}
	 *
	 * @param int     $transaction_id
	 * @return Response
	 */
    public function destroy($transaction_id) {
        //
    }

}
