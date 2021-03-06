<?php
namespace Stakes\Models;

use Illuminate\Auth\UserInterface;
use Log;
use SoftDeletingTrait;
use Watson\Validating\ValidatingTrait;

class User extends BaseModel implements UserInterface {
    use ValidatingTrait;
    use SoftDeletingTrait;

    protected $rules = [
        'username' => 'required|unique:users,username',
        'password' => 'sometimes|required|confirmed'
    ];

    /**
	 * The database table used by the model.
	 *
	 * @var string
	 */
    protected $table = 'users';

    protected $fillable = ['username', 'password', 'password_confirmation', 'super_user'];

    /**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
    protected $hidden = ['password'];

    /**
	 * Get the unique identifier for the user.
	 *
	 * @return mixed
	 */
    public function getAuthIdentifier() {
        return $this->getKey();
    }

    /**
	 * Get the password for the user.
	 *
	 * @return string
	 */
    public function getAuthPassword() {
        return $this->password;
    }

    public function getRememberToken() {
        return $this->remember_token;
    }

    public function setRememberToken($value) {
        $this->remember_token = $value;
    }

    public function getRememberTokenName() {
        return 'remember_token';
    }

    public static function boot() {
        parent::boot();

        User::deleting(function ($user) {
                if ($user->account) {
                    $user->account->delete();
                }
                Log::info('User Deleted', ['username' => $user->username]);
            });
        User::saving(function ($user) {
                Log::info('User Created', ['username' => $user->username]);
            });
    }

    public function account() {
        return $this->hasOne('Stakes\Models\Account');
    }

}
