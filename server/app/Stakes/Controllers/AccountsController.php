<?php
namespace Stakes\Controllers;

use Input;
use Stakes\Models\Account;
use Stakes\Transformers\AccountTransformer;

class AccountsController extends ApiController {

    /**
	 * Display a listing of the resource.
	 * GET /accounts
	 *
	 * @return Response
	 */
    public function index() {
        $users = Account::get();
        return $this->respondWithCollection($users, new AccountTransformer);
    }

    /**
	 * Store a newly created resource in storage.
	 * POST /accounts
	 *
	 * @return Response
	 */
    public function store() {
        $account = new Account();
        $data    = Input::all();
        $account->fill($data);
        // attempt validation
        if ($account->isValid()) {
            $account->save();
            return $this->respondWithItem($account, new AccountTransformer);
        }

        return $this->errorWrongArgs();
    }

    /**
	 * Display the specified resource.
	 * GET /accounts/{account_id}
	 *
	 * @param int     $account_id
	 * @return Response
	 */
    public function show($account_id) {
        $account = Account::where('account_id', '=', $account_id)->first();
        if (is_null($account)) {
            return $this->errorNotFound();
        }
        return $this->respondWithItem($account, new AccountTransformer);
    }

    /**
	 * Update the specified resource in storage.
	 * PUT /accounts/{account_id}
	 *
	 * @param int     $account_id
	 * @return Response
	 */
    public function update($account_id) {
        //
    }

    /**
	 * Remove the specified resource from storage.
	 * DELETE /accounts/{account_id}
	 *
	 * @param int     $account_id
	 * @return Response
	 */
    public function destroy($account_id) {
        $account = Account::where('account_id', '=', $account_id)->first();
        if (is_null($account)) {
            return $this->errorNotFound();
        }
        $account->delete();
        return $this->success();
    }

}
