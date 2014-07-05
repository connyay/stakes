<?php
namespace Stakes\Transformers;

use League\Fractal;
use Stakes\Models\User;
use Stakes\Transformers\AccountTransformer;

class UserTransformer extends Fractal\TransformerAbstract {
    protected $availableIncludes = ['account'];

    public function transform(User $user) {
        return [
            'id'       => (int) $user->id,
            'username' => $user->username,
            'isAdmin'  => (boolean) $user->super_user,
            'created'  => $user->created_at->toISO8601String()
        ];
    }

    public function includeAccount(User $user) {
        $account = $user->account;
        if (is_null($account)) {
            return;
        }
        return $this->item($account, new AccountTransformer);
    }
}
