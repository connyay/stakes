<?php namespace Stakes\Transformers;

use Stakes\Models\User;
use League\Fractal;

class UserTransformer extends Fractal\TransformerAbstract
{
    public function transform( User $user ) {
        return [
        'id'      => (int) $user->id,
        'username'   => $user->username,
        'isAdmin'    => (boolean) $user->super_user,
        'created'   => $user->created_at->toISO8601String()
        ];
    }
}
